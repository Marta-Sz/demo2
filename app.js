window.addEventListener('load', (event) => {

  loadChargingStatus();

  // var circle = document.getElementsByClassName('circle');
  // for (i = 0; i < circle.length; i++) {
  //   circle[i].addEventListener("click", clickCircle);
  // }

  function clickCircle() {

    if(this.className.includes('circle-bg-green')) {
      classReset();
      this.className = 'circle';
    } else {
      classReset();
      this.className = 'circle circle-bg-green';
    }
    LightsaberRand();
  }

  function classReset() {
    var circle = document.getElementsByClassName('circle');
    for (i = 0; i < circle.length; i++) {
      circle[i].className = 'circle';
    }
  }

  function LightsaberRand() {
    var total_power = Math.floor((Math.random() * 7) + 1);
    var LightsaberRand = Math.floor((Math.random() * total_power) + 1);
    document.getElementById('total-power').innerHTML = total_power + 'kW';

    document.getElementById('Lightsaber').innerHTML = LightsaberRand+0 + 'kW';
    document.getElementById('Falcon').innerHTML = total_power-LightsaberRand + 'kW';
  }

  function loadChargingStatus() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var status = JSON.parse(this.responseText);

        var falcon = status.charging_status.falcon;
        if (falcon > 0) {
          document.getElementsByClassName('circle')[0].className='circle-bg-green circle';
        } else {
          document.getElementsByClassName('circle')[0].className='circle';
        }

        var lightsaber = status.charging_status.lightsaber;
        if (lightsaber > 0) {
          document.getElementsByClassName('circle')[1].className='circle-bg-green circle';
        } else {
          document.getElementsByClassName('circle')[1].className='circle';
        }

        document.getElementById('Falcon').innerHTML = falcon + 'kW';
        document.getElementById('Lightsaber').innerHTML = lightsaber + 'kW';

        var total_power = falcon + lightsaber;
        document.getElementById('total-power').innerHTML = total_power + 'kW';
     }
    };
    xhttp.open("GET", "https://challenge.codetain.com/api/v1/charging_status", true);
    xhttp.send();
  }

  setInterval(loadChargingStatus, 10000);

});
