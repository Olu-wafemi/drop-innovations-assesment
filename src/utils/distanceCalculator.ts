
export const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number =>{
    const earth_radius = 6371;
    const Lat_diff = ((lat2-lat1) * Math.PI)/ 180;
    const Long_diff =((lon2 - lon1) * Math.PI)/ 180;
    
    const calculate = 
    Math.sin(Lat_diff / 2) ** 2 +
    Math.cos((lat1 * Math.PI)/ 180) *
    Math.cos((lat2 * Math.PI)/ 180) *
    Math.sin(Long_diff / 2) ** 2;

    const c = 2* Math.atan2(Math.sqrt(calculate), Math.sqrt(1-calculate));
    return earth_radius * c;

}