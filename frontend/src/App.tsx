import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import css from "./App.module.css";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

function App() {
  const [members, setMembers] = useState<any[] | null>(null);
  const map = useMap();

  const fetchMembers = () => {
    fetch("http://localhost:3001/members")
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        setMembers(body);

        let markers = body.map((x: any) =>
          L.marker([x.location.latitude, x.locaiton.longitude])
        );

        let group = L.featureGroup(markers);
        map.fitBounds(group.getBounds());
      });
  };

  useEffect(() => {
    fetchMembers();
    setInterval(() => fetchMembers(), 10000);
  }, []);

  console.log(css);
  return (
    <div className="App">
      <MapContainer
        center={
          members
            ? [members[0].location.latitude, members[0].location.longitude]
            : [0, 0]
        }
        zoom={0}
        scrollWheelZoom={true}
        id={css.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {members
          ? members.map((member) => (
              <Marker
                position={[member.location.latitude, member.location.longitude]}
              >
                <Popup>{member.firstName}</Popup>
              </Marker>
            ))
          : null}
      </MapContainer>
    </div>
  );
}

export default App;
