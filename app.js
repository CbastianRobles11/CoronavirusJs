

const mapAcces='pk.eyJ1IjoiY2Jhc3RpYW4iLCJhIjoiY2s4ZXQwanIxMDA2bzNrbzVtMnlxc3B6YyJ9.3Pl6e_xwbDYiDV5ZuuVToQ';

mapboxgl.accessToken = mapAcces;
let map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
zoom: 3,
center: [-30,0]
});



    renderData();

async function getData(){
    const response= await fetch("https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest" )
    const data=await response.json();
    return data;

}

const getColorFromCount=count=>{
    if(count>=5000){
        return 'red';
    }
    if(count>=1000){
        return 'orange';
    }

        return 'blue';
    

}

async function renderData(){
    const data=await getData();
    console.log(data);
    data.forEach(item =>{

        
        // create the popup
        var popup = new mapboxgl.Popup({ offset: 25 }).setText(
            ` Pais: ${item.countryregion}.\n
             Contagios: ${item.confirmed}.\n
             Muertes: ${item.deaths}.\n
              Recuperados: ${item.recovered}.
             `
            );
             
        const marker= new mapboxgl.Marker({
            color: getColorFromCount(item.confirmed)
         }).setLngLat([item.location.lng,item.location.lat])
         .setPopup(popup).addTo(map);   
    })

   


}