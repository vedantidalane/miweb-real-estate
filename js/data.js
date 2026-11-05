/* data.js – Real Estate Properties */
window.RE = window.RE || {};

RE.FAV_KEY = 'realestate_favourites';
RE.getFavs = ()=>{ try{return JSON.parse(localStorage.getItem(RE.FAV_KEY))||[];}catch{return[];} };
RE.saveFavs = f=>localStorage.setItem(RE.FAV_KEY,JSON.stringify(f));
RE.toggleFav = function(id){
  let favs=RE.getFavs();
  const idx=favs.indexOf(id);
  if(idx===-1)favs.push(id);else favs.splice(idx,1);
  RE.saveFavs(favs);
  return idx===-1;
};
RE.isFav = id=>RE.getFavs().includes(id);

RE.gradients=[
  'linear-gradient(135deg,#1a3a2f,#0d4f3c)','linear-gradient(135deg,#2d1b44,#4a1f5f)',
  'linear-gradient(135deg,#1a1a2e,#16213e)','linear-gradient(135deg,#3d1a00,#5c2a00)',
  'linear-gradient(135deg,#0a2744,#0f4c75)','linear-gradient(135deg,#1a0a0a,#3d0f0f)',
  'linear-gradient(135deg,#0d1b38,#1a2f5a)','linear-gradient(135deg,#1a1a00,#3a3a00)',
  'linear-gradient(135deg,#1c0a2e,#2e1a4a)','linear-gradient(135deg,#0a1a2e,#0d2f4f)',
  'linear-gradient(135deg,#2a1a0a,#4a3010)','linear-gradient(135deg,#0a2a0a,#1a4a1a)',
];
RE.icons=['fa-house','fa-building','fa-city','fa-house-chimney','fa-warehouse','fa-house-flag','fa-hotel','fa-landmark','fa-home','fa-building-columns','fa-house-circle-check','fa-map-marked-alt'];

RE.properties = [
  {id:1,title:'Luxury Sea View Villa',type:'Villa',status:'For Sale',price:850000,city:'Miami',location:'Ocean Drive, Miami, FL',bedrooms:5,bathrooms:4,area:4200,parking:3,yearBuilt:2021,icon:0,gradient:0,featured:true,
   amenities:['Swimming Pool','Home Theater','Smart Home','Garden','Gym','Fireplace'],
   description:'A stunning luxury villa with panoramic sea views. This modern masterpiece features an open-plan living area, chef\'s kitchen, and resort-style pool.'},
  {id:2,title:'Downtown Modern Apartment',type:'Apartment',status:'For Rent',price:3200,city:'New York',location:'5th Avenue, Manhattan, NY',bedrooms:2,bathrooms:2,area:1100,parking:1,yearBuilt:2019,icon:1,gradient:1,featured:true,
   amenities:['Doorman','Rooftop Access','Gym','Concierge','Pet Friendly'],
   description:'Elegant apartment in the heart of Manhattan with breathtaking city views. Modern finishes throughout.'},
  {id:3,title:'Suburban Family Home',type:'House',status:'For Sale',price:425000,city:'Austin',location:'Maple Street, Austin, TX',bedrooms:4,bathrooms:3,area:2800,parking:2,yearBuilt:2018,icon:2,gradient:2,featured:true,
   amenities:['Large Garden','Garage','Patio','Good Schools Nearby'],
   description:'Beautiful family home in a quiet suburb. Spacious backyard perfect for entertaining.'},
  {id:4,title:'Beachfront Condo',type:'Condo',status:'For Sale',price:620000,city:'Miami',location:'Brickell Key, Miami, FL',bedrooms:3,bathrooms:2,area:1800,parking:2,yearBuilt:2022,icon:3,gradient:3,featured:true,
   amenities:['Beach Access','Pool','Spa','Concierge','Marina'],
   description:'Luxury beachfront condo with direct beach access. Fully furnished and move-in ready.'},
  {id:5,title:'Mountain Retreat Cabin',type:'House',status:'For Sale',price:310000,city:'Denver',location:'Pine Ridge, Denver, CO',bedrooms:3,bathrooms:2,area:1950,parking:2,yearBuilt:2016,icon:4,gradient:4,featured:false,
   amenities:['Mountain Views','Fireplace','Large Deck','Hot Tub'],
   description:'Cozy mountain cabin with spectacular views. Perfect for a peaceful retreat or holiday home.'},
  {id:6,title:'City Centre Studio',type:'Apartment',status:'For Rent',price:1800,city:'Chicago',location:'Loop District, Chicago, IL',bedrooms:0,bathrooms:1,area:520,parking:0,yearBuilt:2017,icon:5,gradient:5,featured:false,
   amenities:['Laundry In-Building','Gym','Close to Transit'],
   description:'Modern studio in the heart of Chicago. Ideal for young professionals. Walk to everything.'},
  {id:7,title:'Golf Course Estate',type:'Villa',status:'For Sale',price:1250000,city:'Scottsdale',location:'Desert Mountain, Scottsdale, AZ',bedrooms:6,bathrooms:5,area:5800,parking:4,yearBuilt:2020,icon:6,gradient:6,featured:false,
   amenities:['Golf Course Access','Pool','Tennis Court','Wine Cellar','Smart Home'],
   description:'Grand estate on the renowned Desert Mountain golf course. The pinnacle of luxury living.'},
  {id:8,title:'Historic Townhouse',type:'House',status:'For Rent',price:4500,city:'Boston',location:'Beacon Hill, Boston, MA',bedrooms:3,bathrooms:2,area:2100,parking:1,yearBuilt:1920,icon:7,gradient:7,featured:false,
   amenities:['Historic Character','Renovated Kitchen','Private Patio','Walking Distance to Downtown'],
   description:'Beautifully restored historic townhouse in prestigious Beacon Hill. Original features preserved.'},
  {id:9,title:'Lakeside Penthouse',type:'Condo',status:'For Sale',price:975000,city:'Seattle',location:'Lake Union, Seattle, WA',bedrooms:3,bathrooms:3,area:2400,parking:2,yearBuilt:2023,icon:8,gradient:8,featured:false,
   amenities:['Rooftop Deck','Lake Views','Concierge','Spa','Private Elevator'],
   description:'Extraordinary penthouse with sweeping lake and mountain views. The finest finishes throughout.'},
  {id:10,title:'Investment Land Parcel',type:'Land',status:'For Sale',price:180000,city:'Austin',location:'East 6th Street, Austin, TX',bedrooms:0,bathrooms:0,area:8000,parking:0,yearBuilt:0,icon:9,gradient:9,featured:false,
   amenities:['Zoned Mixed-Use','Corner Lot','Utilities Available','Development Ready'],
   description:'Prime development site in rapidly growing East Austin. Excellent investment opportunity.'},
  {id:11,title:'Riverside Luxury Flat',type:'Apartment',status:'For Rent',price:2800,city:'Chicago',location:'River North, Chicago, IL',bedrooms:2,bathrooms:2,area:1350,parking:1,yearBuilt:2021,icon:10,gradient:10,featured:false,
   amenities:['River Views','Gym','Rooftop Pool','Doorman','Bike Storage'],
   description:'Sophisticated apartment with stunning Chicago River views. Modern amenities and great location.'},
  {id:12,title:'Gated Community Villa',type:'Villa',status:'For Sale',price:680000,city:'Denver',location:'Cherry Hills, Denver, CO',bedrooms:4,bathrooms:3,area:3600,parking:3,yearBuilt:2019,icon:11,gradient:11,featured:false,
   amenities:['Gated Security','Community Pool','Tennis Courts','Mountain Views'],
   description:'Elegant villa in exclusive gated community. Beautifully landscaped garden with mountain views.'},
];

RE.priceLabel = (p,status)=>status==='For Rent'?`$${p.toLocaleString()}/mo`:`$${(p/1000).toFixed(0)}k`;
