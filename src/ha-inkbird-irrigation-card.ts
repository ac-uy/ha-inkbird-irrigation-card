/**
 * HA Inkbird Irrigation Card
 *
 * A custom Lovelace card for managing the Inkbird IIC-600 irrigation controller.
 * 
 * NOTE: Device-level schedules (set via Inkbird app) cannot be read or managed from HA.
 * Schedules shown here are HA automations created and managed by this card.
 */

import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";

interface HassEntity { state: string; attributes: Record<string, any>; last_changed: string; }
interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(domain: string, service: string, data?: Record<string, any>): Promise<void>;
  callWS(msg: Record<string, any>): Promise<any>;
  themes: { darkMode: boolean };
}
interface CardConfig { type: string; entity_prefix?: string; title?: string; zones?: number[]; zone_names?: Record<number, string>; num_zones?: number; }

const ZONE_COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#00BCD4", "#F44336"];
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_IDS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

@customElement("ha-inkbird-irrigation-card")
export class HaInkbirdIrrigationCard extends LitElement {
  @state() private _config!: CardConfig;
  @state() private _loading: Set<string> = new Set();
  @state() private _addingSchedule = false;
  @state() private _editingScheduleId: string | null = null;
  @state() private _newZone = 1;
  @state() private _newTime = "07:00";
  @state() private _newDuration = 30;
  @state() private _newDays: boolean[] = [true, false, true, false, true, false, false];
  @state() private _saving = false;
  private _hass?: HomeAssistant;

  static getConfigElement() { return document.createElement("ha-inkbird-irrigation-card-editor"); }
  static getStubConfig() { return { type: "custom:ha-inkbird-irrigation-card", entity_prefix: "inkbird_iic_600" }; }
  setConfig(config: CardConfig) { this._config = config; }
  set hass(hass: HomeAssistant) { this._hass = hass; this.requestUpdate(); }
  getCardSize() { return 6; }

  private get _prefix(): string { return this._config.entity_prefix || "inkbird_iic_600"; }
  private get _zones(): number[] { return this._config.zones || Array.from({length: this._config.num_zones || 6}, (_, i) => i + 1); }
  private _zoneName(zone: number): string { return this._config.zone_names?.[zone] || `Zone ${zone}`; }
  private _zoneColor(zone: number): string { return ZONE_COLORS[this._zones.indexOf(zone) % ZONE_COLORS.length]; }
  private _zoneIsActive(zone: number): boolean { return this._hass?.states[`switch.${this._prefix}_zone_${zone}`]?.state === "on"; }
  private _zoneRemaining(zone: number): number { const e = this._hass?.states[`sensor.${this._prefix}_zone_${zone}_time_remaining`]; return e ? parseInt(e.state) || 0 : 0; }
  private _zoneElapsed(zone: number): number { const e = this._hass?.states[`sensor.${this._prefix}_zone_${zone}_time_elapsed`]; return e ? parseInt(e.state) || 0 : 0; }
  private _zoneDuration(zone: number): number { const e = this._hass?.states[`number.${this._prefix}_zone_${zone}_duration`]; return e ? parseInt(e.state) || 30 : 30; }
  private get _mainValve(): boolean { return this._hass?.states[`switch.${this._prefix}_main_valve`]?.state === "on"; }
  private get _rainSensor(): boolean { return this._hass?.states[`switch.${this._prefix}_rain_sensor`]?.state === "on"; }
  private get _skipSchedule(): boolean { return this._hass?.states[`switch.${this._prefix}_skip_schedule`]?.state === "on"; }
  private get _mode(): string { return this._hass?.states[`sensor.${this._prefix}_mode`]?.state || "auto"; }
  private get _activeZones(): number[] { return this._zones.filter(z => this._zoneIsActive(z)); }

  // ── Schedules: find automations created by this card ──
  private get _schedules(): { id: string; entity_id: string; name: string; enabled: boolean; zone: number; time: string; days: string; duration: number }[] {
    if (!this._hass) return [];
    const results: any[] = [];
    for (const [eid, entity] of Object.entries(this._hass.states)) {
      if (!eid.startsWith("automation.irr_")) continue;
      const name = entity.attributes?.friendly_name || eid;
      // Parse alias: "Irr: Zone 5 @ 07:00 (30min) Mon,Wed,Fri"
      const m = name.match(/Irr:\s*Zone\s*(\d+)\s*@\s*(\d{2}:\d{2})\s*\((\d+)min\)\s*(.*)/i);
      if (m) {
        results.push({ id: entity.attributes?.id || eid, entity_id: eid, name, enabled: entity.state === "on", zone: parseInt(m[1]), time: m[2], duration: parseInt(m[3]), days: m[4].trim() });
      }
    }
    return results.sort((a, b) => a.zone - b.zone || a.time.localeCompare(b.time));
  }

  // ── Actions ──
  private async _refreshEntity() {
    await new Promise(r => setTimeout(r, 500));
    for (const z of this._zones) await this._hass?.callService("homeassistant", "update_entity", { entity_id: `switch.${this._prefix}_zone_${z}` });
  }
  private async _toggleZone(zone: number) {
    const key = `zone_${zone}`; this._loading = new Set([...this._loading, key]);
    try { await this._hass?.callService("switch", this._zoneIsActive(zone) ? "turn_off" : "turn_on", { entity_id: `switch.${this._prefix}_zone_${zone}` }); await this._refreshEntity(); }
    finally { this._loading = new Set([...this._loading].filter(k => k !== key)); }
  }
  private async _startZone(zone: number, duration: number) {
    const key = `zone_${zone}`; this._loading = new Set([...this._loading, key]);
    try { await this._hass?.callService("number", "set_value", { entity_id: `number.${this._prefix}_zone_${zone}_duration`, value: duration }); await this._hass?.callService("switch", "turn_on", { entity_id: `switch.${this._prefix}_zone_${zone}` }); await this._refreshEntity(); }
    finally { this._loading = new Set([...this._loading].filter(k => k !== key)); }
  }
  private async _stopAll() {
    this._loading = new Set([...this._loading, "stop_all"]);
    try { for (const z of this._zones) if (this._zoneIsActive(z)) await this._hass?.callService("switch", "turn_off", { entity_id: `switch.${this._prefix}_zone_${z}` }); await this._refreshEntity(); }
    finally { this._loading = new Set([...this._loading].filter(k => k !== "stop_all")); }
  }
  private async _toggleSwitch(entityId: string) {
    const key = `sw_${entityId}`; this._loading = new Set([...this._loading, key]);
    try { await this._hass?.callService("switch", this._hass?.states[entityId]?.state === "on" ? "turn_off" : "turn_on", { entity_id: entityId }); await new Promise(r => setTimeout(r, 1000)); await this._hass?.callService("homeassistant", "update_entity", { entity_id: entityId }); await this._hass?.callService("homeassistant", "update_entity", { entity_id: `switch.${this._prefix}_main_valve` }); await this._hass?.callService("homeassistant", "update_entity", { entity_id: `switch.${this._prefix}_rain_sensor` }); await new Promise(r => setTimeout(r, 500)); }
    finally { this._loading = new Set([...this._loading].filter(k => k !== key)); }
  }
  private async _setDuration(zone: number, value: number) { await this._hass?.callService("number", "set_value", { entity_id: `number.${this._prefix}_zone_${zone}_duration`, value }); }
  private async _toggleSchedule(entityId: string) { const isOn = this._hass?.states[entityId]?.state === "on"; await this._hass?.callService("automation", isOn ? "turn_off" : "turn_on", { entity_id: entityId }); }

  private async _addSchedule() {
    const selectedDays = DAY_IDS.filter((_, i) => this._newDays[i]);
    if (selectedDays.length === 0) return;
    this._saving = true;
    try {
      // If editing, delete the old one first
      if (this._editingScheduleId) {
        const configId = this._hass?.states[this._editingScheduleId]?.attributes?.id;
        if (configId) {
          await (this._hass as any).callApi("DELETE", `config/automation/config/${configId}`);
        }
      }
      const daysLabel = DAY_NAMES.filter((_, i) => this._newDays[i]).join(",");
      const id = `irr_zone_${this._newZone}_${this._newTime.replace(":", "")}_${Date.now()}`;
      const alias = `Irr: Zone ${this._newZone} @ ${this._newTime} (${this._newDuration}min) ${daysLabel}`;
      const config = {
        id,
        alias,
        description: "Managed by Inkbird Irrigation Card.",
        trigger: [{ platform: "time", at: `${this._newTime}:00` }],
        condition: [{ condition: "time", weekday: selectedDays }],
        action: [
          { service: "switch.turn_on", target: { entity_id: `switch.${this._prefix}_zone_${this._newZone}` } },
          { delay: { minutes: this._newDuration } },
          { service: "switch.turn_off", target: { entity_id: `switch.${this._prefix}_zone_${this._newZone}` } },
        ],
        mode: "single",
      };
      await (this._hass as any).callApi("POST", `config/automation/config/${id}`, config);
      this._addingSchedule = false;
      this._editingScheduleId = null;
      await this._hass?.callService("automation", "reload", {});
    } catch (e: any) {
      console.error("Failed to create schedule:", e);
    } finally { this._saving = false; }
  }

  private async _removeSchedule(entityId: string) {
    // The config id is in the entity's attributes, not the entity_id
    const configId = this._hass?.states[entityId]?.attributes?.id;
    if (!configId) { console.error("No config id found for", entityId); return; }
    try {
      await (this._hass as any).callApi("DELETE", `config/automation/config/${configId}`);
      await this._hass?.callService("automation", "reload", {});
    } catch (e: any) {
      console.error("Failed to delete schedule:", e);
    }
  }

  private _duplicateSchedule(schedule: any) {
    this._newZone = schedule.zone;
    this._newTime = schedule.time;
    this._newDuration = schedule.duration;
    this._newDays = DAY_NAMES.map(d => schedule.days.includes(d));
    this._editingScheduleId = null;
    this._addingSchedule = true;
  }

  private _editSchedule(schedule: any) {
    this._newZone = schedule.zone;
    this._newTime = schedule.time;
    this._newDuration = schedule.duration;
    this._newDays = DAY_NAMES.map(d => schedule.days.includes(d));
    this._editingScheduleId = schedule.entity_id;
    this._addingSchedule = true;
  }

  // ── Render ──
  render() {
    if (!this._config || !this._hass) return nothing;
    const activeZones = this._activeZones;
    return html`
      <ha-card>
        <div class="card-header">
          <div class="header-left"><ha-icon icon="mdi:sprinkler-variant" class="${activeZones.length > 0 ? 'watering' : ''}"></ha-icon><span class="title">${this._config.title || "Irrigation"}</span></div>
          <div class="header-right">
            ${this._skipSchedule ? html`<span class="badge badge--skip">Skipped</span>` : nothing}
            <span class="badge badge--mode">${this._mode}</span>
            ${activeZones.length > 0 ? html`<button class="stop-all-btn" @click=${this._stopAll}><ha-icon icon="mdi:stop-circle"></ha-icon></button>` : nothing}
          </div>
        </div>
        <div class="card-content">
          ${this._renderSwitches()}
          ${this._zones.map(z => this._renderZone(z))}
          ${this._renderSchedules()}
        </div>
      </ha-card>`;
  }

  private _renderSwitches() {
    return html`<div class="switches-row">
      <button class="sw-btn ${this._mainValve ? 'sw-btn--on' : ''} ${this._loading.has(`sw_switch.${this._prefix}_main_valve`) ? 'sw-btn--loading' : ''}" @click=${() => this._toggleSwitch(`switch.${this._prefix}_main_valve`)}>${this._loading.has(`sw_switch.${this._prefix}_main_valve`) ? html`<ha-icon icon="mdi:loading" class="spin"></ha-icon>` : html`<ha-icon icon="mdi:valve"></ha-icon>`}<span>Valve</span></button>
      <button class="sw-btn ${this._rainSensor ? 'sw-btn--on' : ''} ${this._loading.has(`sw_switch.${this._prefix}_rain_sensor`) ? 'sw-btn--loading' : ''}" @click=${() => this._toggleSwitch(`switch.${this._prefix}_rain_sensor`)}>${this._loading.has(`sw_switch.${this._prefix}_rain_sensor`) ? html`<ha-icon icon="mdi:loading" class="spin"></ha-icon>` : html`<ha-icon icon="mdi:weather-rainy"></ha-icon>`}<span>Rain</span></button>
      ${this._skipSchedule ? html`<div class="sw-btn sw-btn--warn"><ha-icon icon="mdi:calendar-remove"></ha-icon><span>Skipped</span></div>` : nothing}
    </div>`;
  }

  private _renderZone(zone: number) {
    const isActive = this._zoneIsActive(zone); const remaining = this._zoneRemaining(zone);
    const elapsed = this._zoneElapsed(zone); const duration = this._zoneDuration(zone);
    const progress = isActive && (elapsed + remaining) > 0 ? (elapsed / (elapsed + remaining)) * 100 : 0;
    const color = this._zoneColor(zone);
    return html`
      <div class="zone ${isActive ? 'zone--active' : ''}" style="--zone-color: ${color}">
        <div class="zone-main">
          <div class="zone-indicator ${isActive ? 'pulse' : ''}"></div>
          <div class="zone-info"><span class="zone-name">${this._zoneName(zone)}</span>${isActive ? html`<span class="zone-status">${remaining} min remaining</span>` : nothing}</div>
          ${isActive ? html`<button class="zone-btn zone-btn--active" @click=${() => this._toggleZone(zone)}>${this._loading.has(`zone_${zone}`) ? html`<ha-icon icon="mdi:loading" class="spin"></ha-icon>` : html`<ha-icon icon="mdi:stop"></ha-icon>`}</button>`
          : html`<div class="zone-controls"><select class="dur-select" @change=${(e: Event) => this._setDuration(zone, parseInt((e.target as HTMLSelectElement).value))}>${[5,10,15,20,30,45,60,90,120].map(d => html`<option value="${d}" ?selected=${duration === d}>${d} min</option>`)}</select><button class="zone-start-btn" @click=${() => this._startZone(zone, duration)} ?disabled=${this._loading.has(`zone_${zone}`)}>${this._loading.has(`zone_${zone}`) ? html`<ha-icon icon="mdi:loading" class="spin"></ha-icon>` : html`<ha-icon icon="mdi:water"></ha-icon>`}</button></div>`}
        </div>
        ${isActive ? html`<div class="zone-progress"><div class="zone-progress-fill" style="width: ${progress}%"></div></div>` : nothing}
      </div>`;
  }

  private _renderSchedules() {
    const schedules = this._schedules;
    return html`
      <div class="schedule-section">
        <div class="schedule-header">
          <span class="schedule-title"><ha-icon icon="mdi:calendar-clock"></ha-icon> Schedules</span>
          <button class="add-btn" @click=${() => { this._addingSchedule = !this._addingSchedule; this._editingScheduleId = null; }}>${this._addingSchedule ? "Cancel" : "+ Add"}</button>
        </div>
        ${this._addingSchedule ? this._renderAddForm() : nothing}
        ${schedules.length === 0 && !this._addingSchedule ? html`<div class="empty-schedule">No schedules. Tap + Add to create one.</div>` : nothing}
        ${schedules.map(s => html`
          <div class="sched-entry">
            <button class="sched-toggle ${s.enabled ? 'on' : ''}" @click=${() => this._toggleSchedule(s.entity_id)}><ha-icon icon="mdi:${s.enabled ? 'check-circle' : 'circle-outline'}"></ha-icon></button>
            <div class="sched-info"><span class="sched-zone" style="color: ${this._zoneColor(s.zone)}">${this._zoneName(s.zone)}</span><span class="sched-detail">${s.time} · ${s.duration}min · ${s.days}</span></div>
            <button class="sched-action" @click=${() => this._editSchedule(s)}><ha-icon icon="mdi:pencil"></ha-icon></button>
            <button class="sched-action" @click=${() => this._duplicateSchedule(s)}><ha-icon icon="mdi:content-copy"></ha-icon></button>
            <button class="sched-remove" @click=${() => this._removeSchedule(s.entity_id)}><ha-icon icon="mdi:delete"></ha-icon></button>
          </div>
        `)}
      </div>`;
  }

  private _renderAddForm() {
    return html`
      <div class="add-form">
        <div class="form-row"><label>Zone</label><select @change=${(e: Event) => { this._newZone = parseInt((e.target as HTMLSelectElement).value); }}>${this._zones.map(z => html`<option value="${z}" ?selected=${this._newZone === z}>${this._zoneName(z)}</option>`)}</select></div>
        <div class="form-row"><label>Time</label><input type="time" .value=${this._newTime} @change=${(e: Event) => { this._newTime = (e.target as HTMLInputElement).value; }} /></div>
        <div class="form-row"><label>Duration</label><select @change=${(e: Event) => { this._newDuration = parseInt((e.target as HTMLSelectElement).value); }}>${[5,10,15,20,30,45,60,90,120].map(d => html`<option value="${d}" ?selected=${this._newDuration === d}>${d} min</option>`)}</select></div>
        <div class="form-row"><label>Days</label><div class="day-picker">${DAY_NAMES.map((d, i) => html`<button class="day-btn ${this._newDays[i] ? 'day-btn--on' : ''}" @click=${() => { this._newDays = [...this._newDays]; this._newDays[i] = !this._newDays[i]; this.requestUpdate(); }}>${d.slice(0,2)}</button>`)}</div></div>
        <button class="save-btn" @click=${this._addSchedule} ?disabled=${this._saving}>${this._saving ? "Saving..." : this._editingScheduleId ? "Save Changes" : "Create Schedule"}</button>
      </div>`;
  }

  static styles = css`
    :host { display: block; }
    .card-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 16px 8px; }
    .header-left { display: flex; align-items: center; gap: 10px; }
    .header-left ha-icon { --mdc-icon-size: 24px; color: var(--primary-color); }
    .header-left ha-icon.watering { animation: pulse-icon 1.5s ease-in-out infinite; }
    @keyframes pulse-icon { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .title { font-size: 18px; font-weight: 600; }
    .header-right { display: flex; align-items: center; gap: 8px; }
    .badge { font-size: 11px; font-weight: 500; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; }
    .badge--mode { background: var(--secondary-background-color, #e0e0e0); color: var(--secondary-text-color); }
    .badge--skip { background: rgba(255, 152, 0, 0.15); color: var(--warning-color, #FF9800); }
    .stop-all-btn { border: none; background: var(--error-color, #f44336); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; --mdc-icon-size: 18px; }
    .card-content { padding: 8px 16px 16px; display: flex; flex-direction: column; gap: 6px; }
    .switches-row { display: flex; gap: 6px; margin-bottom: 8px; }
    .sw-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 8px; border: 1px solid var(--divider-color, #e0e0e0); border-radius: 10px; background: transparent; cursor: pointer; color: var(--secondary-text-color); font-size: 11px; font-weight: 500; --mdc-icon-size: 20px; transition: all 200ms; }
    .sw-btn--on { background: rgba(76, 175, 80, 0.1); border-color: var(--primary-color, #4CAF50); color: var(--primary-color, #4CAF50); }
    .sw-btn--warn { background: rgba(255, 152, 0, 0.1); border-color: var(--warning-color, #FF9800); color: var(--warning-color, #FF9800); cursor: default; }
    .sw-btn--loading { opacity: 0.6; pointer-events: none; }
    .spin { animation: spin 1s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .zone { border-radius: 12px; background: var(--primary-background-color, #f5f5f5); overflow: hidden; transition: all 200ms; }
    .zone--active { background: color-mix(in srgb, var(--zone-color) 8%, var(--card-background-color, white)); box-shadow: inset 3px 0 0 var(--zone-color); }
    .zone-main { display: flex; align-items: center; gap: 12px; padding: 12px; }
    .zone-indicator { width: 10px; height: 10px; border-radius: 50%; background: var(--zone-color); opacity: 0.4; flex-shrink: 0; }
    .zone-indicator.pulse { opacity: 1; animation: pulse-dot 1.5s ease-in-out infinite; }
    @keyframes pulse-dot { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.7; } }
    .zone-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .zone-name { font-size: 14px; font-weight: 500; }
    .zone-status { font-size: 12px; color: var(--zone-color); font-weight: 500; }
    .zone-controls { display: flex; align-items: center; gap: 6px; }
    .dur-select { padding: 6px 8px; border: 1px solid var(--divider-color, #e0e0e0); border-radius: 8px; font-size: 13px; background: var(--card-background-color, white); color: var(--primary-text-color); cursor: pointer; }
    .zone-start-btn { width: 36px; height: 36px; border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; background: var(--zone-color); color: white; --mdc-icon-size: 18px; transition: opacity 200ms; }
    .zone-start-btn:active { opacity: 0.7; }
    .zone-btn { width: 36px; height: 36px; border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; background: var(--secondary-background-color, #e0e0e0); color: var(--primary-text-color); --mdc-icon-size: 18px; }
    .zone-btn--active { background: var(--zone-color); color: white; }
    .zone-progress { height: 3px; background: rgba(0, 0, 0, 0.06); }
    .zone-progress-fill { height: 100%; background: var(--zone-color); transition: width 2s linear; }

    /* Schedule section */
    .schedule-section { margin-top: 12px; border-top: 1px solid var(--divider-color, #e0e0e0); padding-top: 12px; }
    .schedule-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
    .schedule-title { font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 6px; --mdc-icon-size: 18px; }
    .add-btn { padding: 4px 12px; border: 1px solid var(--primary-color, #4CAF50); border-radius: 8px; background: transparent; color: var(--primary-color, #4CAF50); font-size: 12px; font-weight: 500; cursor: pointer; }
    .empty-schedule { padding: 12px; text-align: center; color: var(--secondary-text-color); font-size: 13px; font-style: italic; }
    .sched-entry { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 8px; background: var(--primary-background-color, #f5f5f5); margin-bottom: 4px; }
    .sched-toggle { border: none; background: transparent; cursor: pointer; --mdc-icon-size: 20px; color: var(--secondary-text-color); padding: 4px; }
    .sched-toggle.on { color: var(--primary-color, #4CAF50); }
    .sched-info { flex: 1; display: flex; flex-direction: column; gap: 1px; }
    .sched-zone { font-size: 13px; font-weight: 500; }
    .sched-detail { font-size: 11px; color: var(--secondary-text-color); }
    .sched-remove { border: none; background: transparent; cursor: pointer; color: var(--error-color, #f44336); --mdc-icon-size: 18px; padding: 4px; }
    .sched-action { border: none; background: transparent; cursor: pointer; color: var(--secondary-text-color); --mdc-icon-size: 16px; padding: 4px; }
    /* Add form */
    .add-form { padding: 12px; border-radius: 8px; background: var(--primary-background-color, #f5f5f5); margin-bottom: 8px; }
    .form-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
    .form-row label { font-size: 13px; font-weight: 500; }
    .form-row select, .form-row input[type="time"] { padding: 6px 8px; border: 1px solid var(--divider-color, #e0e0e0); border-radius: 6px; font-size: 13px; background: var(--card-background-color, white); }
    .day-picker { display: flex; gap: 3px; }
    .day-btn { width: 28px; height: 28px; border: 1px solid var(--divider-color, #e0e0e0); border-radius: 50%; background: transparent; font-size: 10px; font-weight: 600; cursor: pointer; color: var(--secondary-text-color); }
    .day-btn--on { background: var(--primary-color, #4CAF50); color: white; border-color: var(--primary-color, #4CAF50); }
    .save-btn { width: 100%; padding: 10px; border: none; border-radius: 8px; background: var(--primary-color, #4CAF50); color: white; font-size: 13px; font-weight: 500; cursor: pointer; margin-top: 4px; }
    .save-btn:disabled { opacity: 0.6; }
  `;
}


// Register card
window.customCards = window.customCards || [];
window.customCards.push({ type: "ha-inkbird-irrigation-card", name: "Inkbird Irrigation", description: "Manage Inkbird IIC-600: zones, switches, and schedules.", preview: true });

@customElement("ha-inkbird-irrigation-card-editor")
export class HaInkbirdIrrigationCardEditor extends LitElement {
  @state() private _config: any = {};
  private _hass?: HomeAssistant;
  set hass(hass: HomeAssistant) { this._hass = hass; }
  setConfig(config: any) { this._config = config; }
  private get _numZones(): number { return this._config.num_zones || 6; }
  render() {
    const baseSchema = [
      { name: "title", selector: { text: {} }, label: "Card Title" },
      { name: "entity_prefix", selector: { text: {} }, label: "Entity Prefix (e.g. inkbird_iic_600)" },
      { name: "num_zones", selector: { number: { min: 1, max: 12, mode: "box" } }, label: "Number of Zones" },
    ];
    const zoneSchemas: any[] = [];
    for (let i = 1; i <= this._numZones; i++) {
      zoneSchemas.push({ name: `zone_${i}_name`, selector: { text: {} }, label: `Zone ${i} Name` });
      zoneSchemas.push({ name: `zone_${i}_entity`, selector: { entity: { domain: "switch" } }, label: `Zone ${i} Switch` });
    }
    return html`
      <ha-form .hass=${this._hass} .data=${this._config} .schema=${baseSchema} .computeLabel=${(s: any) => s.label || s.name} @value-changed=${this._handleChanged}></ha-form>
      <h3 style="margin:16px 0 8px;font-size:14px;">Zone Configuration</h3>
      <ha-form .hass=${this._hass} .data=${this._config} .schema=${zoneSchemas} .computeLabel=${(s: any) => s.label || s.name} @value-changed=${this._handleChanged}></ha-form>`;
  }
  private _handleChanged(ev: CustomEvent) {
    const config = { ...this._config, ...ev.detail.value };
    const zones: number[] = []; const zoneNames: Record<number, string> = {};
    const n = config.num_zones || 6;
    for (let i = 1; i <= n; i++) { zones.push(i); if (config[`zone_${i}_name`]) zoneNames[i] = config[`zone_${i}_name`]; }
    config.zones = zones; if (Object.keys(zoneNames).length) config.zone_names = zoneNames;
    if (config.entity_prefix) { for (let i = 1; i <= n; i++) { if (!config[`zone_${i}_entity`]) config[`zone_${i}_entity`] = `switch.${config.entity_prefix}_zone_${i}`; } }
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config } }));
  }
}

declare global { interface Window { customCards?: any[]; } }
