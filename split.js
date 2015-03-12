var isDragging = false;
var splitPaneDragging;

function splitjsInit() {
    $(window).mouseup(function() { //Unbind mousemove event when the mouse is release (ie. finished dragging the handle)
        if (isDragging) {
            $(window).unbind("mousemove");
        }
    });
}

$.fn.splitIt = function(direction) {
    splitjsInit();
    if (direction=="vertical") {
        $(this).addClass("split-pane-vertical");
        var handle = $('<div class="split-handle"></div>');
        $(this).children(".split-component-1").after(handle);
        $(handle).mousedown(function(event) {
        var parentSplitPane = $(this).parent();
        parentSplitPane.data("mouseStartX",event.pageX);
        parentSplitPane.data("originalWidth",parentSplitPane.find(".split-component-1").width());
        var splitPaneDragging = parentSplitPane;
            $(window).mousemove(function( event ) {
                    isDragging = true;
                    var splitComponent1 = splitPaneDragging.children(".split-component-1");
                    splitComponent1.width(parentSplitPane.data("originalWidth")+(event.pageX-parentSplitPane.data("mouseStartX")));
                    setFillElements()
                    if(event.preventDefault) event.preventDefault();
            });
           if(event.preventDefault) event.preventDefault();
        });
    }else{
        $(this).addClass("split-pane-horizontal");
        //Horizontal split pane Handle grabbed (mouse down event)
        var handle = $('<div class="split-handle"></div>');
         $(this).children(".split-component-1").after(handle);
       $(handle).mousedown(function(event) {
        var parentSplitPane = $(this).parent();
        parentSplitPane.data("mouseStartY",event.pageY);
        parentSplitPane.data("originalHeight",parentSplitPane.find(".split-component-1").height());
        var splitPaneDragging = parentSplitPane;
            $(window).mousemove(function( event ) {
                    isDragging = true;
                    var splitComponent1 = splitPaneDragging.children(".split-component-1");
                    splitComponent1.height(parentSplitPane.data("originalHeight")+(event.pageY-parentSplitPane.data("mouseStartY")));
                    if (splitComponent1.height()>=splitPaneDragging.height()-6) {
                        splitComponent1.height(splitPaneDragging.height()-6);
                    }
                    setFillElements() 


                    if(event.preventDefault) event.preventDefault();
            });
           if(event.preventDefault) event.preventDefault();
        });
        
    }
    setFillElements();
};



//Sets elements filling a split component to match its dimensions
// (More Info) Direct children of a split component can have a "split-component-fill" class which means it will resize to match
// the split component when the split component is resized.
//  This is mostly when you need to fill 100% height, as 100% width works automatically.
//Author: Brad Triebwasser
function setFillElements() {
    $(".split-component-1").each(function() {
        var pad = 0;
        var padDef = $(this).children(".split-component-fill").attr("data-fillPadSide");
        if (padDef!=undefined) {
            pad = padDef;
        }

        $(this).children(".split-component-fill").height($(this).height());
        $(this).children(".split-component-fill").width($(this).width()-pad);
    });
    $(".split-component-2").each(function() {
        $(this).children(".split-component-fill").height($(this).height());
        $(this).children(".split-component-fill").width($(this).width());
    });
}