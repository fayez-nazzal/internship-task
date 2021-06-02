import { useLayoutEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { getBranchesSalesData } from '../utils/salesUtils';
import { useSelector } from 'react-redux';
import { parseISO } from 'date-fns';
import worker from 'workerize-loader!../workers/worker';
import { Typography } from '@material-ui/core';

const salesWorkerInstance = worker();

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const LeafIcon = L.Icon.extend({
  options: {},
});

const greyIcon = new LeafIcon({
  iconUrl: 'https://i.ibb.co/j6wpZVw/grey-dot.png',
  iconSize: [20, 26],
});

const blueIcon = new LeafIcon({
  iconUrl: 'https://i.ibb.co/Qn1trbg/blue-dot.png',
  iconSize: [22, 26],
});

const yellowIcon = new LeafIcon({
  iconUrl: 'https://i.ibb.co/3smDLJz/yellow-dot.png',
  iconSize: [20, 26],
});

const orangeIcon = new LeafIcon({
  iconUrl: 'https://i.ibb.co/WD5rH4v/orange-dot.png',
  iconSize: [20, 26],
});

const redIcon = new LeafIcon({
  iconUrl: 'https://i.ibb.co/SmyJC6L/red-dot.png',
  iconSize: [20, 26],
});

const BranchesGeo = () => {
  const [workerResult, setWorkerResult] = useState(null);
  const dateRange = useSelector((state) => state.dateRangeFilter);
  const [isLoading, setIsLoading] = useState(true);
  const breakPoints = useRef(0);

  useLayoutEffect(() => {
    const onSalesWorker = ({ data }) => {
      console.log(data);

      const getData = async () => {
        const branchSalesData = data.data.filter(Boolean);
        breakPoints.current = data.breakPoints;

        // 90% of the latitude and longitude provided by the random data are in the sea
        // to workaround this, i geocoded the city name to a new latitude and longitude.

        for (let index = 0; index < branchSalesData.length; index += 1) {
          const res = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${branchSalesData[index].city}.json?access_token=sk.eyJ1IjoiZmF5ZXpuYXp6YWwiLCJhIjoiY2twZGh6MTMxMGc0MzJvbzR6NmVtYTF4eSJ9.dMOnEqdNB7jcHQvLy02b4A`,
          );
          const data = await res.json();

          branchSalesData[index].lat = data.features[0].geometry.coordinates[1];
          branchSalesData[index].long =
            data.features[0].geometry.coordinates[0];
        }

        setWorkerResult(branchSalesData);
        setIsLoading(false);
      };

      data.breakPoints && data.data && getData();
    };

    salesWorkerInstance.addEventListener('message', onSalesWorker);
    salesWorkerInstance.workBranchesSales(
      parseISO(dateRange.startDate),
      parseISO(dateRange.endDate),
    );

    return () => {
      salesWorkerInstance.removeEventListener('message', onSalesWorker);
    };
  }, [dateRange.startDate, dateRange.endDate]);

  return !workerResult || !workerResult.length ? (
    <Typography variant="h5">Loading...</Typography>
  ) : (
    <MapContainer
      center={[workerResult[0].lat + 2, workerResult[0].long + 10]}
      zoom={4}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {workerResult.map((branch) => (
        <Marker
          icon={
            (branch.sales === 0 && greyIcon) ||
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
  );
};

export default BranchesGeo;
