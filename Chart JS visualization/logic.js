

//$.getJSON("http://127.0.0.1:5000/api/v1.0/Tsunami", function(data) {


$.getJSON("https://amirahanchian.github.io/Resources/Cleaned_Data_intensity.json", function(data) {
    //console.log(data);

    
    var tsunami_info = data

    // checking that all information was pulled correctly
    //console.log(tsunami_info)
    

   
   cause = _.countBy(tsunami_info, function(tsunami_info) { return tsunami_info['Tsunami Cause Code']; });
      

   delete Object.assign(cause, { "Earthquake": cause['1'] })['1'];
   delete Object.assign(cause, { "Earthquake and Landslide": cause['3'] })['3'];
   delete Object.assign(cause, { "Volcano": cause['6'] })['6'];
   delete Object.assign(cause, { "Meteorological": cause['9'] })['9'];

   //console.log(cause); // { newKey: 'value' }


   
   cause2 = {...cause, "Questionable Earthquake": 0, "Volcano and Earthquake":0, "Volcano, Earthquake, and Landslide":0, "Volcano and Landslide":0, "Landslide":0};
   //console.log(cause2)

   country = _.countBy(tsunami_info, function(tsunami_info) { return tsunami_info['Country']; });
   
   year = _.countBy(tsunami_info, function(tsunami_info) { return tsunami_info['Year']; });
   year_array = Object.entries(year);


   //const groupBy = (array, key) => {
     // Return the end result
     //  return array.reduce((result, currentValue) => {
     // If an array already present for key, push it to the array. Else create an array and push the object
     //  (result[currentValue[key]] = result[currentValue[key]] || []).push(
     //  currentValue
     //   );
     // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
     //   return result;
     // }, {}); // empty object is the initial value for result object
    //};
    
    // Group by color as key to the person array
    //const year_grouped = groupBy(year_array, '0');
   
   //console.log(year_grouped)




   //Chart.defaults.global.legend.display = false; 
   const ctx = document.getElementById('myChart').getContext("2d");
   var chart = new Chart(ctx, {
      type: 'bar',
      data: {
         
         datasets: [{
            backgroundColor: 'rgb(129, 198, 0)',
            borderColor: 'rgb(0, 150, 215)',
            data: cause2
         }]
      },
      options: {
         responsive: 'true',
         
         plugins:{
            title: {
               display: true,
               text: 'Tsunami Cause'},
            legend: {
                display: false,}     
         }
      }
   
   });

   const ctx2 = document.getElementById('myChart2');
   var chart2 = new Chart(ctx2, {
      type: 'bar',
      
      data: {
         
         datasets: [{
            backgroundColor: 'rgb(1000, 0, 2)',
            borderColor: 'rgb(0, 150, 215)',
            data: country
         }]
      },
      options: {
         responsive: 'true',
         
         plugins:{
            title: {
               display: true,
               text: 'Tsunami Data by Country'},
            legend: {
                display: false,}     
         }
      }
   });

   const ctx3 = document.getElementById('myChart3');
   var chart3 = new Chart(ctx3, {
      type: 'line',
      data: {
         
         datasets: [{
            backgroundColor: 'rgb(0, 198, 2228)',
            borderColor: 'rgb(0, 150, 215)',
            data: year
            
         }]
      },
      options: {
         responsive: 'true',
         plugins:{
            title: {
               display: true,
               text: 'Tsunami Frequency by Year'},
            legend: {
                display: false,}     
         }
      }
   
   });
});


