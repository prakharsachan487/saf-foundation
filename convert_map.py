import json
import urllib.request
import os

geojson_url = "https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States"
svg_out_path = 'c:/Users/sacha/OneDrive/Desktop/saf_foundation/assets/images/india-real-states.svg'

print("Downloading India GeoJSON...")
req = urllib.request.Request(geojson_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
except Exception as e:
    print("Download failed, using mirror:", e)
    secondary_url = "https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson"
    req2 = urllib.request.Request(secondary_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req2) as response:
        data = json.loads(response.read().decode('utf-8'))

min_lon, max_lon = 68.0, 97.5
min_lat, max_lat = 7.0, 37.5

width, height = 580, 640
pad = 20

def project(lon, lat):
    x = pad + (lon - min_lon) / (max_lon - min_lon) * (width - 2 * pad)
    y = height - pad - (lat - min_lat) / (max_lat - min_lat) * (height - 2 * pad)
    return f"{x:.1f},{y:.1f}"

svg_parts = []
svg_parts.append(f'''<svg class="india-detailed-svg" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="cleanShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000000" flood-opacity="0.08"/>
    </filter>
  </defs>

  <g filter="url(#cleanShadow)">
''')

features = data.get('features', [])

for feature in features:
    props = feature.get('properties', {})
    state_name = props.get('name', props.get('ST_NM', props.get('state_name', props.get('NAME_1', 'State'))))
    geom = feature.get('geometry', {})
    gtype = geom.get('type')
    coords = geom.get('coordinates', [])
    
    is_bihar = 'bihar' in state_name.lower()
    fill = "#FFCA3A" if is_bihar else "#EDEBE4"
    stroke = "#D4D0C5" if not is_bihar else "#E5B229"
    stroke_w = "1.5" if is_bihar else "1"
    
    path_d = ""
    if gtype == 'Polygon':
        for ring in coords:
            pts = [project(pt[0], pt[1]) for pt in ring]
            if pts:
                path_d += f"M {' L '.join(pts)} Z "
    elif gtype == 'MultiPolygon':
        for poly in coords:
            for ring in poly:
                pts = [project(pt[0], pt[1]) for pt in ring]
                if pts:
                    path_d += f"M {' L '.join(pts)} Z "
                    
    if path_d:
        svg_parts.append(f'    <path d="{path_d}" fill="{fill}" stroke="{stroke}" stroke-width="{stroke_w}" stroke-linejoin="round" class="state-poly" data-name="{state_name}"/>\n')

# Clean non-glowing markers
svg_parts.append('''
    <!-- Flagship Bihar Hub Pin (Clean Crisp) -->
    <g class="map-marker bihar-hub" transform="translate(365, 305)">
      <circle cx="0" cy="0" r="14" fill="#FFCA3A" opacity="0.35"/>
      <circle cx="0" cy="0" r="7.5" fill="#FFCA3A" stroke="#FFFFFF" stroke-width="2.5"/>
      <circle cx="0" cy="0" r="2.5" fill="#161616"/>
      <rect x="12" y="-12" width="125" height="24" rx="12" fill="#FFFFFF" stroke="#FFCA3A" stroke-width="1.5"/>
      <text x="74" y="4.5" fill="#161616" font-size="10" font-family="'Poppins', sans-serif" font-weight="700" text-anchor="middle">🚩 BIHAR FLAGSHIP</text>
    </g>

    <!-- Delhi HQ Pin -->
    <g class="map-marker delhi-hq" transform="translate(205, 235)">
      <circle cx="0" cy="0" r="6" fill="#161616" stroke="#FFFFFF" stroke-width="2"/>
      <circle cx="0" cy="0" r="2" fill="#FFFFFF"/>
      <rect x="10" y="-10" width="80" height="20" rx="10" fill="#FFFFFF" stroke="#CCCCCC" stroke-width="1"/>
      <text x="50" y="4.5" fill="#161616" font-size="9.5" font-family="'Poppins', sans-serif" font-weight="600" text-anchor="middle">📍 DELHI HQ</text>
    </g>

    <!-- Operational District Nodes -->
    <circle cx="160" cy="315" r="4.5" fill="#FFCA3A" stroke="#FFFFFF" stroke-width="1.5"/>
    <circle cx="210" cy="380" r="4.5" fill="#FFCA3A" stroke="#FFFFFF" stroke-width="1.5"/>
    <circle cx="270" cy="460" r="4.5" fill="#FFCA3A" stroke="#FFFFFF" stroke-width="1.5"/>
    <circle cx="340" cy="400" r="4.5" fill="#FFCA3A" stroke="#FFFFFF" stroke-width="1.5"/>
    <circle cx="450" cy="275" r="4.5" fill="#FFCA3A" stroke="#FFFFFF" stroke-width="1.5"/>
  </g>
</svg>''')

os.makedirs(os.path.dirname(svg_out_path), exist_ok=True)
with open(svg_out_path, 'w', encoding='utf-8') as f:
    f.writelines(svg_parts)

print("Clean Crisp Light Map Generated Successfully at", svg_out_path)
