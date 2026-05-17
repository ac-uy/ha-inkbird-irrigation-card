/**
 * HA Inkbird Irrigation Card
 *
 * A custom Lovelace card for managing the Inkbird IIC-600 irrigation controller.
 */

import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";

interface HassEntity {
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
}

interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(domain: string, service: string, data?: Record<string, any>): Promise<void>;
  themes: { darkMode: boolean };
}

interface CardConfig {
  type: string;
  entity_prefix?: string;
  title?: string;
  zones?: number[];
  zone_names?: Record<number, string>;
}

const ZONE_COLORS = [
  "#4CAF50", // green
  "#2196F3", // blue
  "#FF9800", // orange
  "#9C27B0", // purple
  "#00BCD4", // cyan
  "#F44336", // red
];

@customElement("ha-inkbird-irrigation-card")
export class HaInkbirdIrrigationCard extends LitElement {
  @state() private _config!: CardConfig;
  private _hass?: HomeAssistant;

  static getConfigElement() {
    return document.createElement("ha-inkbird-irrigation-card-editor");
  }

  static getStubConfig() {
    return { type: "custom:ha-inkbird-irrigation-card", entity_prefix: "inkbird_iic_600" };
  }

  setConfig(config: CardConfig) {
    this._config = config;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this.requestUpdate();
  }

  getCardSize() {
    return 4;
  }

  private get _prefix(): string {
    return this._config.entity_prefix || "inkbird_iic_600";
  }

  private get _zones(): number[] {
    return this._config.zones || [1, 2, 3, 4, 5, 6];
  }

  private _zoneName(zone: number): string {
    return this._config.zone_names?.[zone] || `Zone ${zone}`;
  }

  private _zoneColor(zone: number): string {
    const idx = this._zones.indexOf(zone);
    return ZONE_COLORS[idx % ZONE_COLORS.length];
  }

  private _zoneSwitch(zone: number): HassEntity | undefined {
    return this._hass?.states[`switch.${this._prefix}_zone_${zone}`];
  }

  private _zoneRemaining(zone: number): number {
    const entity = this._hass?.states[`sensor.${this._prefix}_zone_${zone}_time_remaining`];
    return entity ? parseInt(entity.state) || 0 : 0;
  }

  private _zoneElapsed(zone: number): number {
    const entity = this._hass?.states[`sensor.${this._prefix}_zone_${zone}_time_elapsed`];
    return entity ? parseInt(entity.state) || 0 : 0;
  }

  private _zoneDuration(zone: number): number {
    const entity = this._hass?.states[`number.${this._prefix}_zone_${zone}_duration`];
    return entity ? parseInt(entity.state) || 30 : 30;
  }

  private _zoneIsActive(zone: number): boolean {
    return this._zoneSwitch(zone)?.state === "on";
  }

  private get _mode(): string {
    return this._hass?.states[`sensor.${this._prefix}_mode`]?.state || "auto";
  }

  private get _skipSchedule(): boolean {
    return this._hass?.states[`switch.${this._prefix}_skip_schedule`]?.state === "on";
  }

  private get _activeZones(): number[] {
    return this._zones.filter(z => this._zoneIsActive(z));
  }

  // ── Actions ──

  private async _refreshEntity() {
    await new Promise(r => setTimeout(r, 500));
    // Refresh all zone switches to get updated state
    for (const zone of this._zones) {
      await this._hass?.callService("homeassistant", "update_entity", {
        entity_id: `switch.${this._prefix}_zone_${zone}`,
      });
    }
  }

  private async _toggleZone(zone: number) {
    const isOn = this._zoneIsActive(zone);
    const entityId = `switch.${this._prefix}_zone_${zone}`;
    await this._hass?.callService("switch", isOn ? "turn_off" : "turn_on", { entity_id: entityId });
    await this._refreshEntity();
  }

  private async _startZone(zone: number, duration: number) {
    await this._hass?.callService("number", "set_value", {
      entity_id: `number.${this._prefix}_zone_${zone}_duration`,
      value: duration,
    });
    await this._hass?.callService("switch", "turn_on", {
      entity_id: `switch.${this._prefix}_zone_${zone}`,
    });
    await this._refreshEntity();
  }

  private async _stopAll() {
    for (const zone of this._zones) {
      if (this._zoneIsActive(zone)) {
        await this._hass?.callService("switch", "turn_off", {
          entity_id: `switch.${this._prefix}_zone_${zone}`,
        });
      }
    }
    await this._refreshEntity();
  }

  private async _toggleSwitch(entityId: string) {
    const isOn = this._hass?.states[entityId]?.state === "on";
    await this._hass?.callService("switch", isOn ? "turn_off" : "turn_on", { entity_id: entityId });
  }

  private async _setDuration(zone: number, value: number) {
    await this._hass?.callService("number", "set_value", {
      entity_id: `number.${this._prefix}_zone_${zone}_duration`,
      value,
    });
  }

  // ── Render ──

  render() {
    if (!this._config || !this._hass) return nothing;

    const activeZones = this._activeZones;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="header-left">
            <ha-icon icon="mdi:sprinkler-variant" class="${activeZones.length > 0 ? 'watering' : ''}"></ha-icon>
            <span class="title">${this._config.title || "Irrigation"}</span>
          </div>
          <div class="header-right">
            ${this._skipSchedule ? html`<span class="badge badge--skip">Skipped</span>` : nothing}
            <span class="badge badge--mode">${this._mode}</span>
            ${activeZones.length > 0 ? html`
              <button class="stop-all-btn" @click=${this._stopAll}>
                <ha-icon icon="mdi:stop-circle"></ha-icon>
              </button>
            ` : nothing}
          </div>
        </div>
        <div class="card-content">
          ${this._renderSwitches()}
          ${this._zones.map(zone => this._renderZone(zone))}
        </div>
      </ha-card>
    `;
  }

  private _renderSwitches() {
    const mainValve = this._mainValve;
    const rainSensor = this._rainSensor;
    const skipSchedule = this._skipSchedule;

    return html`
      <div class="switches-row">
        <button class="sw-btn ${mainValve ? 'sw-btn--on' : ''}" @click=${() => this._toggleSwitch(`switch.${this._prefix}_main_valve`)}>
          <ha-icon icon="mdi:valve"></ha-icon>
          <span>Valve</span>
        </button>
        <button class="sw-btn ${rainSensor ? 'sw-btn--on' : ''}" @click=${() => this._toggleSwitch(`switch.${this._prefix}_rain_sensor`)}>
          <ha-icon icon="mdi:weather-rainy"></ha-icon>
          <span>Rain</span>
        </button>
        <button class="sw-btn ${skipSchedule ? 'sw-btn--warn' : ''}" @click=${() => this._toggleSwitch(`switch.${this._prefix}_skip_schedule`)}>
          <ha-icon icon="mdi:calendar-remove"></ha-icon>
          <span>Skip</span>
        </button>
      </div>
    `;
  }

  private _renderZone(zone: number) {
    const isActive = this._zoneIsActive(zone);
    const remaining = this._zoneRemaining(zone);
    const elapsed = this._zoneElapsed(zone);
    const duration = this._zoneDuration(zone);
    const progress = isActive && (elapsed + remaining) > 0 ? (elapsed / (elapsed + remaining)) * 100 : 0;
    const color = this._zoneColor(zone);

    return html`
      <div class="zone ${isActive ? 'zone--active' : ''}" style="--zone-color: ${color}">
        <div class="zone-main">
          <div class="zone-indicator ${isActive ? 'pulse' : ''}"></div>
          <div class="zone-info">
            <span class="zone-name">${this._zoneName(zone)}</span>
            ${isActive ? html`
              <span class="zone-status">${remaining} min remaining</span>
            ` : nothing}
          </div>
          ${isActive ? html`
            <button class="zone-btn zone-btn--active" @click=${() => this._toggleZone(zone)}>
              <ha-icon icon="mdi:stop"></ha-icon>
            </button>
          ` : html`
            <div class="zone-controls">
              <select class="dur-select" @change=${(e: Event) => this._setDuration(zone, parseInt((e.target as HTMLSelectElement).value))}>
                ${[5, 10, 15, 20, 30, 45, 60, 90, 120].map(d => html`
                  <option value="${d}" ?selected=${duration === d}>${d} min</option>
                `)}
              </select>
              <button class="zone-start-btn" @click=${() => this._startZone(zone, duration)}>
                <ha-icon icon="mdi:water"></ha-icon>
              </button>
            </div>
          `}
        </div>
        ${isActive ? html`
          <div class="zone-progress">
            <div class="zone-progress-fill" style="width: ${progress}%"></div>
          </div>
        ` : nothing}
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }

    /* Header */
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 16px 8px;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .header-left ha-icon {
      --mdc-icon-size: 24px;
      color: var(--primary-color);
    }
    .header-left ha-icon.watering {
      animation: pulse-icon 1.5s ease-in-out infinite;
    }
    @keyframes pulse-icon {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .title { font-size: 18px; font-weight: 600; }
    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .badge {
      font-size: 11px;
      font-weight: 500;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .badge--mode {
      background: var(--secondary-background-color, #e0e0e0);
      color: var(--secondary-text-color);
    }
    .badge--skip {
      background: rgba(255, 152, 0, 0.15);
      color: var(--warning-color, #FF9800);
    }
    .stop-all-btn {
      border: none;
      background: var(--error-color, #f44336);
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      --mdc-icon-size: 18px;
    }

    /* Content */
    .card-content { padding: 8px 16px 16px; display: flex; flex-direction: column; gap: 6px; }

    /* System switches */
    .switches-row {
      display: flex;
      gap: 6px;
      margin-bottom: 8px;
    }
    .sw-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 10px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      background: transparent;
      cursor: pointer;
      color: var(--secondary-text-color);
      font-size: 11px;
      font-weight: 500;
      --mdc-icon-size: 20px;
      transition: all 200ms;
    }
    .sw-btn--on {
      background: rgba(76, 175, 80, 0.1);
      border-color: var(--primary-color, #4CAF50);
      color: var(--primary-color, #4CAF50);
    }
    .sw-btn--warn {
      background: rgba(255, 152, 0, 0.1);
      border-color: var(--warning-color, #FF9800);
      color: var(--warning-color, #FF9800);
    }

    /* Zone */
    .zone {
      border-radius: 12px;
      background: var(--primary-background-color, #f5f5f5);
      overflow: hidden;
      transition: all 200ms;
    }
    .zone--active {
      background: color-mix(in srgb, var(--zone-color) 8%, var(--card-background-color, white));
      box-shadow: inset 3px 0 0 var(--zone-color);
    }
    .zone-main {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
    }
    .zone-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--zone-color);
      opacity: 0.4;
      flex-shrink: 0;
    }
    .zone-indicator.pulse {
      opacity: 1;
      animation: pulse-dot 1.5s ease-in-out infinite;
    }
    @keyframes pulse-dot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.7; }
    }
    .zone-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .zone-name { font-size: 14px; font-weight: 500; }
    .zone-status { font-size: 12px; color: var(--zone-color); font-weight: 500; }
    .zone-status.idle { color: var(--secondary-text-color); font-weight: 400; }
    .zone-controls {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .dur-select {
      padding: 6px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      font-size: 13px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .zone-start-btn {
      width: 36px;
      height: 36px;
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: var(--zone-color);
      color: white;
      --mdc-icon-size: 18px;
      transition: opacity 200ms;
    }
    .zone-start-btn:active { opacity: 0.7; }
    .zone-btn {
      width: 36px;
      height: 36px;
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: var(--secondary-background-color, #e0e0e0);
      color: var(--primary-text-color);
      --mdc-icon-size: 18px;
      transition: all 200ms;
    }
    .zone-btn--active {
      background: var(--zone-color);
      color: white;
    }

    /* Progress */
    .zone-progress {
      height: 3px;
      background: rgba(0, 0, 0, 0.06);
    }
    .zone-progress-fill {
      height: 100%;
      background: var(--zone-color);
      transition: width 2s linear;
    }

  `;
}

// Register card
window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-inkbird-irrigation-card",
  name: "Inkbird Irrigation",
  description: "Manage your Inkbird IIC-600 irrigation controller: zone controls, progress, and status.",
  preview: true,
});

declare global {
  interface Window { customCards?: any[]; }
}
