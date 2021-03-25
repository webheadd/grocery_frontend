import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController } from "@ionic/angular";

declare var google;
@Component({
  selector: 'app-set-location',
  templateUrl: './set-location.page.html',
  styleUrls: ['./set-location.page.scss'],
})
export class SetLocationPage implements OnInit {
  @ViewChild('map', {static: false}) mapContainer: ElementRef;
  @ViewChild('searchPlaces', {static: false}) search: ElementRef;

  map: any;

  constructor(public geolocation: Geolocation,
              public navCtrl: NavController) { }

  ngOnInit() {
    this.getCurrentPosition();
  }

  async getCurrentPosition() {

    //use saved location if available
    const addressFromStorage = await JSON.parse(localStorage.getItem('deliveryAddress'));
    if(addressFromStorage) return this.initMap(addressFromStorage.lat, addressFromStorage.lng)

    //if no location saved, use current location
    const currentLocation = await this.geolocation.getCurrentPosition();
    if(currentLocation) return this.initMap(currentLocation.coords.latitude, currentLocation.coords.longitude);

  }

  initMap(lat, lng) {
    const pos = {
      lat: lat,
      lng: lng
    }
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: pos,
      zoom: 15,
      maxZoom: 15,
      minZoom: 8,
      disableDefaultUI: true,
      gestureHandling: 'greedy',
      panControl: true
    })

    //search places ------------------
    // let options = {
    //   componentRestrictions:
    //   {
    //     country: 'ph'
    //   }
    // }
    //   var autocomplete = new google.maps.places.Autocomplete(this.search.nativeElement, options);
  
    //   autocomplete.addListener("place_changed", () => {
    //     const searchResult = {
    //       lat: autocomplete.getPlace().geometry.location.lat(),
    //       lng: autocomplete.getPlace().geometry.location.lng()
    //     };

    //     set this to lessen pricing
    //     autocomplete.setFields(
    //       ['address_components', 'geometry', 'icon', 'name']);

  
    //     //set searched loc as center
    //     this.map.setCenter(searchResult)
    //   }) -------------------

  }

  async getCurrentLocation() {
    const myLocation = await this.geolocation.getCurrentPosition();
    const centerPosition = {
      lat: myLocation.coords.latitude,
      lng: myLocation.coords.longitude
    }
    this.map.panTo(centerPosition)
  }
  
  saveAddress() {
    const address = {
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng()
    }
    localStorage.setItem('deliveryAddress', JSON.stringify(address));
    alert("Address Saved!")
    
    this.navCtrl.back();
  }
}
