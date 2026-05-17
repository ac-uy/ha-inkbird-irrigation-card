/**
 * HA Inkbird Irrigation Card
 *
 * A custom Lovelace card for managing the Inkbird IIC-600 irrigation controller.
 * Shows zone status with progress, start/stop controls, and duration adjustment.
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
}

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

  private get _mainValve(): boolean {
    return this._hass?.states[`switch.${this._prefix}_main_valve`]?.state === "on";
  }

  private get _rainSensor(): boolean {
    return this._hass?.states[`switch.${this._prefix}_rain_sensor`]?.state === "on";
  }

  private get _skipSchedule(): boolean {
    return this._hass?.states[`switch.${this._prefix}_skip_schedule`]?.state === "on";
  }

  private get _anyZoneActive(): boolean {
    return this._zones.some(z => this._zoneIsActive(z));
  }

  // ── Actions ──

  private async _toggleZone(zone: number) {
    const isOn = this._zoneIsActive(zone);
    const entityId = `switch.${this._prefix}_zone_${zone}`;
    await this._hass?.callService("switch", isOn ? "turn_off" : "turn_on", { entity_id: entityId });
  }

  private async _stopAll() {
    for (const zone of this._zones) {
      if (this._zoneIsActive(zone)) {
        await this._hass?.callService("switch", "turn_off", {
          entity_id: `switch.${this._prefix}_zone_${zone}`,
        });
      }
    }
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

    return html`
      <ha-card .header=${this._config.title || "Irrigation"}>
        <div class="card-content">
          ${this._renderStatus()}
          ${this._renderZones()}
        </div>
      </ha-card>
    `;
  }

  private _renderStatus() {
    const mode = this._mode;
    const anyActive = this._anyZoneActive;
    const skipSchedule = this._skipSchedule;

    return html`
      <div class="status-section">
        <div class="status-row">
          <ha-icon icon="mdi:sprinkler-variant"></ha-icon>
          <span class="status-text">${anyActive ? "Watering" : "Idle"}</span>
          <span class="status-mode">${mode}</span>
          ${skipSchedule ? html`<span class="status-skip"><ha-icon icon="mdi:calendar-remove"></ha-icon></span>` : nothing}
          ${anyActive ? html`
            <button class="stop-all-btn" @click=${this._stopAll}>
              <ha-icon icon="mdi:stop"></ha-icon> Stop All
            </button>
          ` : nothing}
        </div>
      </div>
    `;
  }

  private _renderZones() {
    return html`
      <div class="zones-section">
        ${this._zones.map(zone => this._renderZone(zone))}
      </div>
    `;
  }

  private _renderZone(zone: number) {
    const isActive = this._zoneIsActive(zone);
    const remaining = this._zoneRemaining(zone);
    const elapsed = this._zoneElapsed(zone);
    const duration = this._zoneDuration(zone);
    const progress = isActive && duration > 0 ? Math.min((elapsed / duration) * 100, 100) : 0;

    return html`
      <div class="zone-row ${isActive ? 'active' : ''}">
        <div class="zone-header">
          <button class="zone-toggle ${isActive ? 'on' : ''}" @click=${() => this._toggleZone(zone)}>
            <ha-icon icon="mdi:${isActive ? 'water' : 'water-off'}"></ha-icon>
          </button>
          <span class="zone-name">Zone ${zone}</span>
          ${isActive ? html`
            <span class="zone-time">${remaining} min left</span>
          ` : html`
            <span class="zone-duration">${duration} min</span>
          `}
        </div>
        ${isActive ? html`
          <div class="zone-progress">
            <div class="zone-progress-bar" style="width: ${progress}%"></div>
          </div>
        ` : nothing}
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .card-content { padding: 16px; }

    /* Status */
    .status-section { margin-bottom: 16px; }
    .status-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
      border-radius: 12px;
      background: var(--primary-background-color, #f5f5f5);
    }
    .status-text { font-size: 16px; font-weight: 500; flex: 1; }
    .status-mode {
      font-size: 12px;
      text-transform: uppercase;
      padding: 2px 8px;
      border-radius: 4px;
      background: var(--secondary-background-color, #e0e0e0);
      color: var(--secondary-text-color);
    }
    .status-skip { color: var(--warning-color, #FF9800); --mdc-icon-size: 18px; }
    .stop-all-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border: none;
      border-radius: 8px;
      background: var(--error-color, #f44336);
      color: white;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      --mdc-icon-size: 16px;
    }

    /* Zones */
    .zones-section { display: flex; flex-direction: column; gap: 8px; }
    .zone-row {
      padding: 10px 12px;
      border-radius: 10px;
      background: var(--primary-background-color, #f5f5f5);
      transition: background 200ms;
    }
    .zone-row.active {
      background: rgba(33, 150, 243, 0.08);
      border: 1px solid rgba(33, 150, 243, 0.3);
    }
    .zone-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .zone-toggle {
      width: 36px;
      height: 36px;
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: var(--secondary-background-color, #e0e0e0);
      color: var(--secondary-text-color);
      --mdc-icon-size: 20px;
      transition: all 200ms;
    }
    .zone-toggle.on {
      background: var(--info-color, #2196F3);
      color: white;
    }
    .zone-name { font-size: 14px; font-weight: 500; flex: 1; }
    .zone-time { font-size: 13px; color: var(--info-color, #2196F3); font-weight: 500; }
    .zone-duration { font-size: 13px; color: var(--secondary-text-color); }

    /* Progress */
    .zone-progress {
      margin-top: 8px;
      height: 4px;
      border-radius: 2px;
      background: rgba(33, 150, 243, 0.15);
      overflow: hidden;
    }
    .zone-progress-bar {
      height: 100%;
      border-radius: 2px;
      background: var(--info-color, #2196F3);
      transition: width 1s linear;
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
