let select = document.querySelector("#country")
let select1 = document.querySelector("#state")
let select2 = document.querySelector("#city")

var option;
var a;
let b;
var headers = new Headers();

headers.append("X-CSCAPI-KEY", "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==");

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
  .then(response => { return response.json() })
  .then(result => {
    console.log(result)
    showdetails(result)
  })
  .catch(error => console.log(error));


function showdetails(result) {

  for (let i = 0; i < result.length; i++) {
    option = document.createElement("option")
    option.innerHTML = result[i].name
    option.value = result[i].iso2

    select.append(option)
    select.onchange = () => {
      a = select.value
      console.log(a)
      let b = "https://api.countrystatecity.in/v1/countries/" + a + "/states"
      fetch(b, requestOptions)
        .then((response) => { return response.json() })
        .then((view) => {
          console.log(view)
          showdtails(view)
        })
        .catch(error => console.log(error));
      function showdtails(view) {
        console.log(view.length)
        for (let i = 0; i < view.length; i++){
          let option1 = document.createElement("option")
          option1.innerHTML = view[i].name
          option1.value = view[i].iso2
          select1.append(option1)



          select1.onchange = () => {
            b = select1.value
            console.log(b)
            fetch("https://api.countrystatecity.in/v1/countries/"+ a +"/states/" + b + "/cities", requestOptions)
              .then((response) => { return response.json() })
              .then((hey) => {
                console.log(hey)
                showtails(hey)

              })
              .catch(error => console.log(error));


            function showtails(hey) {
              console.log(hey.length)
              for (let i = 0; i < hey.length; i++) {
                let option2 = document.createElement("option")
                option2.innerHTML = hey[i].name
                select2.append(option2)
              }

            }
          }
        }
      }

    }

  }

}














