function init() {
    console.log("Hello World");

    $(".box-inserisci i").click(putitems);
    readitems();
    $(document).on("click","i.delete",deleteitems);


}

$(document).ready(init);

function readitems(){
  clearitems();
  $.ajax({
    url:"http://157.230.17.132:3012/todos",
    method:"GET",
    success:function(data){
      console.log(data);
      printitems(data);

    },
    error:function(){
      alert("errore");
    }
  });
}

function printitems(itemslist){
  var numberofitems=itemslist.length;
  $(".id-app p.number-in-shopping-cart").html(numberofitems);
  var obj=$(".container .box-items");
  var source=$("#item-template").html();
  var template=Handlebars.compile(source);
  for(var i=0;i<itemslist.length;i++){
    var context={
      text:itemslist[i].text,
      id:itemslist[i].id
    };
    var html=template(context);
    obj.append(html);

  }

}


function deleteitems(){
  var itemselementlength=$("p.number-in-shopping-cart").text();
  console.log(itemselementlength);
  $("p.number-in-shopping-cart").html(itemselementlength-1);
  var itemsdeleteid=$(this).parent().attr("rifid");
  var itemsdelete=$(this).parent();
  console.log(itemsdeleteid);

  $.ajax({
    url:"http://157.230.17.132:3012/todos/"+itemsdeleteid,
    method:"DELETE",
    success:function(){
      console.log("eliminato");
      itemsdelete.remove();
    },
    error:function(){
      alert("errore");
    },
  });
}
function clearitems(){
  $(".box-items").html("");
}
function putitems(){
  var textinput=$(".box-inserisci input").val();
  console.log(textinput);
  $.ajax({
    url:"http://157.230.17.132:3012/todos/",
    method:"POST",
    data:{
      text:textinput,
    },
    success:function(){
      readitems();
    },
    error:function(){
      alert("errore");
    },
  })
  $(".box-inserisci input").val("");
}
