# Inkbird Irrigation Card

[![GitHub Release](https://img.shields.io/github/release/ac-uy/ha-inkbird-irrigation-card.svg?style=flat-square)](https://github.com/ac-uy/ha-inkbird-irrigation-card/releases)
[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg?style=flat-square)](https://hacs.xyz/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/ac-uy/ha-inkbird-irrigation-card/blob/master/LICENSE)

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

### Setting the title

The card header text comes from the card's own `title` option (shown in the
visual editor as **Card Title**), and defaults to "Irrigation" when unset.

Note this is **not** the same as a Section heading. On a Sections dashboard,
the "Edit section" title is stored by Home Assistant as a separate `heading`
card — it does not change this card's header. To rename the card header, set
`title` **inside the card config**:

```yaml
type: custom:ha-inkbird-irrigation-card
entity_prefix: inkbird_iic_600
title: Garden (IIC-600)
```

### Multiple controllers

If you run more than one Inkbird controller (e.g. an IIC-600 and an IIC-800),
give each card its own `entity_prefix`. Schedules created from a card are
scoped to that card's prefix, so a schedule set on one controller no longer
appears on the other.

## Development

```bash
git clone https://github.com/ac-uy/ha-inkbird-irrigation-card.git
cd ha-inkbird-irrigation-card
npm install
npm run build
```

## License

MIT

## Support

If you find this useful, consider buying me a coffee ☕ or some tokens 🤖:

[![PayPal](https://img.shields.io/badge/PayPal-Donate-blue.svg?style=flat-square&logo=paypal)](https://paypal.me/AndresCastro965?locale.x=es_ES&country.x=ES)
