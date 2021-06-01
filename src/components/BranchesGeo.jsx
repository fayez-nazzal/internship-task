import { useLayoutEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { getTotalSalesData } from '../utils/salesUtils';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const LeafIcon = L.Icon.extend({
  options: {},
});

const blueIcon = new LeafIcon({
  iconUrl: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
});
const yellowIcon = new LeafIcon({
  iconUrl: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
});
const orangeIcon = new LeafIcon({
  iconUrl: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
});
const redIcon = new LeafIcon({
  iconUrl: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
});

const BranchesGeo = () => {
  const [branchesData, setBranchesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const breakPoints = useRef(0);

  useLayoutEffect(() => {
    const getData = async () => {
      const totalSalesRet = getTotalSalesData(
        new Date('May 1, 2015'),
        new Date('May 1, 2020'),
      );
      const branchSalesData = totalSalesRet.data;
      breakPoints.current = totalSalesRet.breakPoints;

      setIsLoading(true);

      // 90% of the latitude and longitude provided by the random data are in the sea
      // to workaround this, i geocoded the city name to a new latitude and longitude.

      for (let index = 0; index < branchSalesData.length; index += 1) {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${branchSalesData[index].city}.json?access_token=sk.eyJ1IjoiZmF5ZXpuYXp6YWwiLCJhIjoiY2twZGh6MTMxMGc0MzJvbzR6NmVtYTF4eSJ9.dMOnEqdNB7jcHQvLy02b4A`,
        );
        const data = await res.json();

        branchSalesData[index].lat = data.features[0].geometry.coordinates[1];
        branchSalesData[index].long = data.features[0].geometry.coordinates[0];
      }

      setBranchesData([...branchSalesData]);
      setIsLoading(false);
    };

    getData();
  }, []);

  return (
    !isLoading && (
      <MapContainer
        center={[branchesData[0].lat, branchesData[0].long]}
        zoom={3}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {branchesData.map((branch) => (
          <Marker
            icon={
              (branch.sales <= breakPoints.current[0] && blueIcon) ||
              (branch.sales <= breakPoints.current[1] && yellowIcon) ||
              (branch.sales <= breakPoints.current[2] && orangeIcon) ||
              (branch.sales <= breakPoints.current[3] && redIcon)
            }
            key={branch.city}
            position={[branch.lat, branch.long]}
          >
            <Popup>
              {`${branch.name} - ${branch.city}`}{' '}
              <p style={{ color: '#ff123a' }}>
                {`Total sales: ${Math.round(branch.sales)}`}
              </p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    )
  );
};

export default BranchesGeo;
