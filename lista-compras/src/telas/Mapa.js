import React from 'react';
import { useEffect, useRef } from 'react';
import './Mapa.css';
import { Map, View, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Style, Icon} from 'ol/style';
import {Point} from 'ol/geom';



export const Mapa = (props) => {

    const mapRaf = useRef();
    //será executado após o return, última coisa a ser executada
    useEffect(() => {
        // console.log("PASSO 1", mapRaf.current);
        //onde será apontado
        const mapa = new Map({
            target: mapRaf.current,
            layers: [
                new TileLayer({
                  source: new OSM({attributions: []})
                })
            ],
            view: new View({
                center: fromLonLat([-46.640096,-23.588201]),
                zoom: 20
            })
        });
        
        var markers = new VectorLayer({
            source: new VectorSource(),
            style: new Style({
                image: new Icon({
                anchor: [0.5, 1],
                src: 'https://cdn.mapmarker.io/api/v1/pin?text=OI&size=100&hoffset=1'
                })
            })
        });

        mapa.addLayer(markers);

        var marker = new Feature(new Point(fromLonLat([-46.640096,-23.588201])));
        marker.setId("ESPM");
        markers.getSource().addFeature(marker);

        mapa.on("click", (event) => {
            console.log(event.coordinate);
            var marker = new Feature(new Point(event.coordinate));
            markers.getSource().addFeature(marker);
        })

    }, [])
    
    // console.log("PASSO 2", mapRaf.current);
    return <div className='map' ref={mapRaf}></div>
}