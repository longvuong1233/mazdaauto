    // Click Button Heading
    $('#heading').click(function () {
      $('#result').append('<h1 class="draggable" id ="heading" contenteditable="true" draggable="true"><b>Heading</b><span class="closeBtn">x</span></h1>')
      dragWork()
    })

    // Click Button Paragraph
    $('#Paragraph').click(function () {
      $('#result').append('<p class="draggable" id="paragraph"  contenteditable="true" draggable="true"><b id="paragraphText">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eos unde excepturi nihil sequi quos nemo. At quam veniam sint ullam placeat amet laudantium facere neque recusandae adipisci minus fugit voluptatum corporis vero nihil quae, soluta aperiam dignissimos, consequatur ipsum doloribus nisi exercitationem, totam saepe. Excepturi facilis laborum asperiores odio odit, nam sint incidunt quos doloremque quidem officia accusamus. Architecto voluptates autem itaque accusantium soluta, ut repellat ullam voluptatem doloremque doloribus explicabo nam numquam perspiciatis facere eveniet odit saepe. Praesentium ex vero minima odit deleniti neque, dolorum repellat molestiae facere ut doloremque distinctio voluptates, dicta quas, eum nostrum perspiciatis ad!</b><span class="closeBtn">x</span></p>')
      dragWork()
    })

    // Click Button Save
    var imgResult;
    $('#saveInfo').click(function() {
    $('.closeBtn').remove();
    $('label').remove();
    var nameVal = $('input[name=name]').val();
    var titleVal = $('input[name=title]').val();
    var lengthVal = $('input[name=length]').val();
    var fuelVal = $('input[name=fuel]').val();
    var performanceVal = $('input[name=perfomance]').val();
    var priceVal = $('input[name=price]').val();
    var filterVal = $('input[name=filter]').val();
    var elm = document.querySelector('#result'); 
    var elmVal = elm.outerHTML
    var detailInfo
    var objValue = {
        name: nameVal,
        title: titleVal,
        length: lengthVal,
        fuel: fuelVal,
        perfomance: performanceVal,
        price: priceVal,
        filter:filterVal,
        img: imgResult,
        detailInfo: elmVal,
    }

    //Call api save new car
    fetch("/admin-page/save/newCar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objValue),
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log("Response from server:", responseData);
        })
        .catch((error) => {
          console.error("Error sending data to server:", error);
        });
})
    
    $('#imgWithText').click(function () {
      customHTML = ` <div class='draggable mkrelative' draggable="true" >
            <div class="row">
            <div class='col-sm-4'>
                <label  class="btn btn-success"> Upload
                    <input  type="file" data-res='1' onchange="UploadAndPreview(this)">
                </label><br>
                <img src="images/upload.jpg" id="" class="img-responsive" height="250px" width="250px">             
            </div>
            <div class='col-sm-4'>
                <label class="btn btn-success"> Upload
                <input type="file" data-res='2' onchange="UploadAndPreview(this)">
                </label><br>
                <img src="images/upload.jpg" id="" class="img-responsive" height="250px" width="250px">
                </div>
            <div class='col-sm-4'>
            <label  class="btn btn-success"> Upload
                <input  type="file" data-res='2' onchange="UploadAndPreview(this)">
            </label><br>
            <img src="images/upload.jpg" id="" class="img-responsive" height="250px" width="250px">
            </div>

            </div>
            <span class="closeBtn">x</span>
        </div>`

 
      // Result append
      $('#result').append(customHTML)
      dragWork()
    })


    $(document).on('click', '.closeBtn', function (e) {
      e.target.parentElement.remove()
    })



containerFeature = document.getElementsByClassName('containerFeature')[0]
var resultSave = document.getElementById('saveInfo');

function dragWork(){

draggable = document.querySelectorAll('.draggable'); 

draggable.forEach((dragEl) => {
    dragEl.addEventListener('dragstart', () => {
        dragEl.classList.add('dragging')
    })

    dragEl.addEventListener('dragend', () => {
        dragEl.classList.remove('dragging')
    })
})
 

containerFeature.addEventListener('dragover', (e) => {
    dragging = document.querySelector('.dragging');
    placeBefore = getTheDragElement(e.clientY)
    containerFeature.insertBefore(dragging, placeBefore)
        // containerFeature.appendChild(dragging);
})
}

dragWork();


function getTheDragElement(y) {

    draggable = [...document.querySelectorAll('.draggable:not(.dragging)')]

    return draggable.reduce((closest, child) => {
        box = child.getBoundingClientRect();
        offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {

            return { offset: offset, element: child }

        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

// ############### upload and preview image ##########

 function UploadAndPreview(e){ 
    
    var mycurrentimage =  e.parentElement.nextElementSibling.nextElementSibling;  
    var myinputfield = e.files[0]; 
    // mycurrentimage.src = reader.result;
   
    var reader = new FileReader(); 
    reader.onload = function(){
    if(reader.readyState = "complete"){
      var imgVal = reader.result
      console.log("abc");
      //const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', imgVal);
      formData.append('upload_preset', 'bookingapp');
      formData.append('cloud_name', 'devat-channel');
    
      fetch(`https://api.cloudinary.com/v1_1/ddxxozy4t/image/upload`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
        
         mycurrentimage.src = data.secure_url;
         imgResult = data.secure_url

        })
        .catch((error) => console.error(error));
    }
   
    } 
    
    reader.readAsDataURL(myinputfield);
   
    }