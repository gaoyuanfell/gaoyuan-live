import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	map: any;
	geocoder: any;
	placeSearch: any;
	drving: any;//驾车路线
	constructor() { }

	ngOnInit() {
		this.map = new AMap.Map('container', {
			resizeEnable: true,
			zoom: 11,
			mapStyle: 'normal',
			// showBuildingBlock: true,
			// center: [116.397428, 39.90923]
		});

		AMap.event.addListener(this.map, 'click', (e) => {
			var position = [e.lnglat.lng, e.lnglat.lat];
			var marker = new AMap.Marker({
				position: position
			});
			marker.setMap(this.map);
			AMap.event.addListener(marker, 'click', (e1) => {

				if(this.geocoder){
					this.geocoder.getLocation("江西省南昌市莲塘镇", (status, result) => {
						console.info(status);
						console.info(result);
					})
				}

				new AMap.InfoWindow({
					content: `${JSON.stringify(e1.lnglat)}`,
					offset: new AMap.Pixel(0, -30),
				}).open(this.map, e1.target.getPosition());
			})
		})


		// AMap.plugin(['AMap.Driving'], function () {
		// 	var drving = new AMap.Driving({
		// 		map: this.map
		// 	})
		// 	drving.search([
		// 		{ keyword: '北京西站', city: '北京' },
		// 		{ keyword: '高德地图', city: '北京' }
		// 	]);
		// })
		var service = ['AMap.PlaceSearch', 'AMap.Geocoder', 'AMap.Driving']
		AMap.service(service, () => {
			var placeSearch = this.placeSearch = new AMap.PlaceSearch({ //构造地点查询类
				pageSize: 5,
				pageIndex: 1,
				city: "010",//城市
				map: this.map,
				panel: "result"
			});

			var geocoder = this.geocoder = new AMap.Geocoder({
				city: "010"//城市，默认：“全国”
			});

			var drving = this.drving = new AMap.Driving({
				map: this.map
			})
			// drving.search([
			// 	{ keyword: '北京西站', city: '北京' },
			// 	{ keyword: '高德地图', city: '北京' }
			// ]);
		})

		var plugin = ['AMap.Geolocation', 'AMap.ToolBar', 'AMap.Scale', 'AMap.Autocomplete',]
		AMap.plugin(plugin, () => {

			this.map.addControl(new AMap.Scale());
			// this.map.addControl(new AMap.ToolBar());
			// this.map.addControl(new AMap.Geolocation());

			//实例化Autocomplete
			var autoOptions = {
				city: "", //城市，默认全国
				input: "keyword"//使用联想输入的input的id
			};
			var autocomplete = new AMap.Autocomplete(autoOptions);
			AMap.event.addListener(autocomplete, 'select', (e) => {
				console.info(e);
				var p = [e.poi.location.lng, e.poi.location.lat]
				this.map.setCenter(p)
				this.map.setZoom(15)
			})
		})

	}

}
