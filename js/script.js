new Vue({
	el: '#app',
	data: {
		layers: {
			bisquit:	{
				title:		'Бисквит',
				pricePerSm:	5,
			},
			crem:		{
				title:		'Крем',
				pricePerSm:	12,
			},
			tvorog:		{
				title:		'Творог',
				pricePerSm:	8,
			},
		},
		cakeLayers:	[
			{ type: 'bisquit', height: 4 },
			{ type: 'crem', height: 6 },
			{ type: 'bisquit', height: 4 },
		],
		cakeWidth:		40,
		defaultHeight:	4,
		defaultLayer:	'bisquit',
	},
	methods: {
		addLayer() {
			// добавляет в cakeLayers слой (объект)
			this.cakeLayers.push( {
				type: 	this.defaultLayer,
				height:	this.defaultHeight,
			} );
		},
		delLayer( index ) {
			// удаляет в cakeLayers один слой (объект)
			this.cakeLayers.splice( index, 1 );
		},
		order() {
			let this_layers = this.layers,
				result		= 'Вы заказали тортик!';
			
			result		+= '\nСлои:';
			this.cakeLayers.forEach(function (obj) {
				result		+= "\n==="+this_layers[obj.type].title+" - "+obj.height+" см";
			});
			result 		+= '\nСтоимость: '+this.totalPrice+' грн.';
				
			alert(result);
		},
	},
	components: {
		'layer': {
			props: ['index', 'type', 'height', 'price'],
			template: `
				<div :class="type" class="layer" :style="{ height: height * 10 + 'px' }">
					<span class="number">#{{ index }}</span>
					<span class="height">{{ height }} см</span>
					<span class="price">{{ price * height }} грн</span>
				</div>
			`,
		},
	},
	computed: {
		totalPrice() {
			let total = 0,
				this_layers = this.layers;
	
			// this.cakeLayers.forEach(function (obj) {
			// 	total += this_layers[obj.type].pricePerSm * obj.height;
			// });

			for (let i = 0; i < this.cakeLayers.length; i++) {
				total += this.layers[ this.cakeLayers[i].type ].pricePerSm * this.cakeLayers[i].height;
			}

			return total;
		},
	},
});