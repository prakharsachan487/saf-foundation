import urllib.request, json, os, math

geojson_url = "https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States"
svg_out_path = 'c:/Users/sacha/OneDrive/Desktop/saf_foundation/assets/images/india-real-states.svg'

print("Downloading authentic India GeoJSON...")
req = urllib.request.Request(geojson_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
except Exception as e:
    print("Download error:", e)
    raise e

width, height = 580, 650
pad = 18
min_lon, max_lon = 68.0, 97.5
min_lat, max_lat = 6.5, 37.5
cos_lat = math.cos(math.radians(22.0))

scale_x = (width - 2 * pad) / ((max_lon - min_lon) * cos_lat)
scale_y = (height - 2 * pad) / (max_lat - min_lat)
scale = min(scale_x, scale_y)

def project(lon, lat):
    x = pad + (lon - min_lon) * cos_lat * scale + 10
    y = height - pad - (lat - min_lat) * scale
    return round(x, 1), round(y, 1)

patna_x, patna_y = project(85.1376, 25.5941)
delhi_x, delhi_y = project(77.2090, 28.6139)

svg = []
svg.append(f'''<svg class="india-detailed-svg" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .state-poly {{
        transition: opacity 0.2s ease, filter 0.2s ease;
      }}
      .state-poly:hover {{
        opacity: 0.9;
        filter: brightness(0.95);
      }}
      .state-bihar {{
        filter: drop-shadow(0 2px 8px rgba(245, 158, 11, 0.45));
      }}
      .marker-pulse {{
        animation: mapPulse 2.2s ease-out infinite;
        transform-origin: center;
      }}
      @keyframes mapPulse {{
        0% {{ r: 5px; opacity: 0.8; }}
        70% {{ r: 18px; opacity: 0; }}
        100% {{ r: 18px; opacity: 0; }}
      }}
    </style>
    <filter id="cleanShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#0F172A" flood-opacity="0.07"/>
    </filter>
  </defs>

  <g filter="url(#cleanShadow)">
''')

features = data.get('features', [])

bihar_feature = None
other_features = []

for feature in features:
    props = feature.get('properties', {})
    state_name = props.get('NAME_1', props.get('name', props.get('ST_NM', 'State')))
    if state_name.lower().strip() == 'bihar':
        bihar_feature = feature
    else:
        other_features.append(feature)

# Render base states first
for feature in other_features:
    props = feature.get('properties', {})
    state_name = props.get('NAME_1', props.get('name', props.get('ST_NM', 'State')))
    geom = feature.get('geometry', {})
    gtype = geom.get('type')
    coords = geom.get('coordinates', [])
    
    path_d = ""
    if gtype == 'Polygon':
        for ring in coords:
            pts = [f"{project(pt[0], pt[1])[0]},{project(pt[0], pt[1])[1]}" for pt in ring]
            if pts:
                path_d += f"M {' L '.join(pts)} Z "
    elif gtype == 'MultiPolygon':
        for poly in coords:
            for ring in poly:
                pts = [f"{project(pt[0], pt[1])[0]},{project(pt[0], pt[1])[1]}" for pt in ring]
                if pts:
                    path_d += f"M {' L '.join(pts)} Z "
                    
    if path_d:
        svg.append(f'    <path d="{path_d}" fill="#EDEAE3" stroke="#D2CDC0" stroke-width="0.9" stroke-linejoin="round" class="state-poly" data-name="{state_name}"/>\n')

# Render Bihar on top so its border and highlight are crisp and completely unobstructed
if bihar_feature:
    geom = bihar_feature.get('geometry', {})
    gtype = geom.get('type')
    coords = geom.get('coordinates', [])
    path_d = ""
    if gtype == 'Polygon':
        for ring in coords:
            pts = [f"{project(pt[0], pt[1])[0]},{project(pt[0], pt[1])[1]}" for pt in ring]
            if pts:
                path_d += f"M {' L '.join(pts)} Z "
    elif gtype == 'MultiPolygon':
        for poly in coords:
            for ring in poly:
                pts = [f"{project(pt[0], pt[1])[0]},{project(pt[0], pt[1])[1]}" for pt in ring]
                if pts:
                    path_d += f"M {' L '.join(pts)} Z "
    if path_d:
        svg.append(f'    <path d="{path_d}" fill="#F59E0B" stroke="#B45309" stroke-width="1.8" stroke-linejoin="round" class="state-poly state-bihar" data-name="Bihar"/>\n')

svg.append(f'''
  </g>

  <!-- Clean Precise Bihar Flagship Marker -->
  <g class="map-markers-layer">
    <!-- Bihar Flagship Ground Hub (Patna) -->
    <g transform="translate({patna_x}, {patna_y})">
      <circle cx="0" cy="0" r="16" class="marker-pulse" fill="#F59E0B" opacity="0.45"/>
      <circle cx="0" cy="0" r="6.5" fill="#F59E0B" stroke="#FFFFFF" stroke-width="2"/>
      <circle cx="0" cy="0" r="2.5" fill="#1E293B"/>
      <g transform="translate(10, -12)">
        <rect x="0" y="0" width="130" height="24" rx="12" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1.5" filter="url(#cleanShadow)"/>
        <text x="65" y="15.5" fill="#0F172A" font-size="9" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="800" text-anchor="middle">🚩 BIHAR FLAGSHIP</text>
      </g>
    </g>
  </g>
</svg>''')

os.makedirs(os.path.dirname(svg_out_path), exist_ok=True)
with open(svg_out_path, 'w', encoding='utf-8') as f:
    f.writelines(svg)

print("Accurate, clean SVG map generated at:", svg_out_path)
