$(function(){

  var taskid;
  var sprintid = $('div.sprintboard').attr('id');
  $("#sortable1").sortable({connectWith:"#sortable2,#sortable3"});
  $("#sortable2").sortable({connectWith:"#sortable3"});
  $("#sortable3").sortable({connectWith:"#sortable2"});
  
  $( "div.taskbar" ).each(function(){
    var size = Number($(this).attr('size'));
    var left = Number($(this).attr('left'));
    $(this).progressbar({value:(size-left)*100/size});
    console.log(size,left);
  });

  $("#burndown-form").dialog({
    autoOpen: false,
    height: 300,
    width: 350,
    modal: true,
    buttons: {
      "burn it":function(){
        $('input[name=points]').val('13');
        $('#burnform').submit();
      },
      "close": function() {
        $('input[name=points]').val("");
        $( this ).dialog( "close" );
      }
    }
  });

  $(".burnbut").button().click(function() {
    taskid =$(this).parent().attr('id'); 
    $('input[name=taskid]').val(taskid);
    $('input[name=sprintid]').val(sprintid);
    console.log(taskid,sprintid);
    $("#burndown-form").dialog( "open" );
  });
 }); 
