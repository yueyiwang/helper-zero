def get_search_bounding_box(search_lat, search_lon, radius):
    """Build a low effort bounding box. Open to future improvements / suggestions.
    """
    search_lat = float(search_lat)
    search_lon = float(search_lon)
    lat_radius, lon_radius = _covert_miles_to_degrees(radius)
    tl_lon = search_lon + lon_radius
    tl_lat = search_lat + lat_radius
    br_lon = search_lon - lon_radius
    br_lat = search_lat - lat_radius
    return tl_lon, tl_lat, br_lon, br_lat

def _covert_miles_to_degrees(radius):
    """Approximate the conversion from miles to degrees.
        Source: https://www.usgs.gov/faqs/how-much-distance-does-a-degree-minute-and-second-cover-your-maps?qt-news_science_products=0#qt-news_science_products
    """
    lat_radius = radius * 1/69
    lon_radius = radius * 1/54.6
    return lat_radius, lon_radius
