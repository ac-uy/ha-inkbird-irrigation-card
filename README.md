# Inkbird Irrigation Card

A custom Home Assistant Lovelace card for managing the Inkbird IIC-600 WiFi irrigation controller. Shows zone status with progress bars, start/stop controls, and duration display — all in one card.

## Features

- **Zone controls** — Tap to start/stop any zone
- **Progress bars** — Visual countdown when a zone is active
- **Time remaining** — Shows minutes left on active zones
- **Stop All** — Emergency stop button when any zone is running
- **Status bar** — Mode (auto/manual), schedule skip indicator

## Requirements

This card requires the [Inkbird Irrigation integration](https://github.com/ac-uy/ha-inkbird-irrigation) to be installed and configured.

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click the three dots menu (top right) → **Custom repositories**
3. Add `ac-uy/ha-inkbird-irrigation-card` with category **Lovelace**
4. Search for "Inkbird Irrigation Card" and click **Download**
5. Hard refresh your browser

### Manual Installation

1. Download `ha-inkbird-irrigation-card.js` from the [latest release](https://github.com/ac-uy/ha-inkbird-irrigation-card/releases/latest)
2. Copy it to your `config/www/` directory
3. Add the resource in **Settings → Dashboards → Resources**:
   - URL: `/local/ha-inkbird-irrigation-card.js`
   - Type: JavaScript Module

## Configuration

```yaml
type: custom:ha-inkbird-irrigation-card
entity_prefix: inkbird_iic_600
title: Irrigation        # optional
zones: [5, 6]            # optional - show only specific zones (default: all 6)
```

### Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `entity_prefix` | string | ❌ | Entity prefix (default: `inkbird_iic_600`) |
| `title` | string | ❌ | Card title (default: "Irrigation") |
| `zones` | number[] | ❌ | Which zones to show (default: all 6) |

## Development

```bash
git clone https://github.com/ac-uy/ha-inkbird-irrigation-card.git
cd ha-inkbird-irrigation-card
npm install
npm run build
```

## License

MIT
