import React, { useEffect, useState } from "react";
import {
  Map,
  InfoWindow,
  Marker,
  Polyline,
  GoogleApiWrapper,
} from "google-maps-react";

const MapContainer = ({ google, state, setter }) => {
  const bounds = new window.google.maps.LatLngBounds();
  state.nodes.forEach((node) => bounds.extend(node.position));

  useEffect(() => {}, [state.nodes]);

  return (
    <Map
      google={google}
      initialCenter={{ lat: 25.36277778, lng: 49.56305556 }}
      zoom={20}
      style={{
        height: "100%",
        width: "100%",
      }}
      bounds={bounds}
      containerStyle={{
        height: "100%",
        width: "100%",
      }}
      zoomControlOptions={{
        position: google.maps.ControlPosition.LEFT_CENTER,
      }}
      streetViewControlOptions={{
        position: google.maps.ControlPosition.LEFT_TOP,
      }}
      fullscreenControl={false}
    >
      {state.nodes.map((node, index) => (
        <Marker
          key={index}
          name={node.name}
          position={node.position}
          title={node.name}
          label={node.name}
          onClick={() => {
            setter.setNodes(
              state.nodes.map((n) =>
                n.position === node.position ? { ...n, showInfo: true } : n
              )
            );
          }}
        />
      ))}

      {state.nodes.map((node, index) => (
        <InfoWindow
          key={index}
          position={{ ...node.position, lat: node.position.lat }}
          visible={node.showInfo}
          onClose={() =>
            setter.setNodes(
              state.nodes.map((n) =>
                n.position === node.position ? { ...n, showInfo: false } : n
              )
            )
          }
        >
          <h1>Node {node.name}</h1>
          <p>
            {typeof node.content !== "undefined"
              ? `Accumulated cost: ${Math.round(node.content * 1000) / 1000} m`
              : `At ${JSON.stringify(node.position)}`}
          </p>
        </InfoWindow>
      ))}

      {state.lines.map((line) => {
        return (
          <Polyline
            path={state.nodes
              .filter(
                (node) => node.name === line.rel[0] || node.name === line.rel[1]
              )
              .map((node) => node.position)}
            strokeColor="#FF0000"
            strokeOpacity={0.8}
            strokeWeight={1}
          />
        );
      })}

      {state.paths.length === 0 ? null : (
        <Polyline
          path={state.paths.map(
            (path) =>
              state.nodes.filter((node) => node.name === path.node)[0].position
          )}
          strokeColor="#000000"
          strokeOpacity={1}
          strokeWeight={3}
        />
      )}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyD4R3GIGq1of7rPhu-ya4pCFLCQkQIBuyE",
})(MapContainer);
