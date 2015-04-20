
var tagNames = ["#tag-1", "#tag-2", "#tag-3", "#tag-4", "#tag-5"]
var tagDistance = 900;
var tagTarget = [
	{
		top: 266,
		left: 232
	},
	{
		top: 266,
		left: 397
	},
	{
		top: 266,
		left: 562
	},
	{
		top: 407,
		left: 315
	},
	{
		top: 407,
		left: 480
	}
];
var tagInitial = [
	{
		top: 266,
		left: 232 - tagDistance
	},
	{
		top: 266,
		left: 397 - tagDistance
	},
	{
		top: 266,
		left: 562 - tagDistance
	},
	{
		top: 407,
		left: 315 - tagDistance
	},
	{
		top: 407,
		left: 480 - tagDistance
	}
];

// States
var currentFill;
var nextFill;
state = 1;

$(document).ready(function(){
	
	// Hex Initialization
	var length = tagNames.length;
	for(var i = 0; i < length; i++){
		$(tagNames[i]).css("left", tagInitial[i].left + "px");
		$(tagNames[i]).css("top", tagInitial[i].top + "px");
	}

	// Set Center
	var promptWidth = Number($(".prompt").css("width").replace('px',''));
	var promptLeft = 512 - promptWidth/2;
	$(".prompt").css("left", promptLeft + "px");

	// Click function for prompt
    $(".fill-in").click(function(){

    	currentFill = $(this);

        $(".prompt").animate({
        		"left": '50px',
        		"top" : '50px'
        	}
        );

        for(var i = 0; i < length; i++){
        	
			$(tagNames[i]).delay(100 + (length - i) * 150).animate({
					"left": tagTarget[i].left + "px",
					"top": tagTarget[i].top + "px"
				}
			);
		}

    });

    // Click function for tag
    $(".tag").click(function(){   		
    	nextFill = getNextFill(currentFill.attr("id"));
    	console.log(state);

    	// Edit the current fill-in
    	currentFill.css({
    		"color": "black"
    	});
    	currentFill.html($(this).children().html());

    	// Edit the next fill-in
    	$("#" + nextFill).css({
    		"display": "inline-block"
    	});
    	if(state==2){
    		$(".comma").css({
    			"display": "inline-block"
    		});
    	}

    	// Get Prompt Left
    	var promptWidth = Number($(".prompt").css("width").replace('px',''));
		var promptLeft = 512 - promptWidth/2;

		// Move the Selected Tag
		var tagIndex = tagNames.indexOf("#" + $(this).attr("id"));
		$("#tag-selected-1").css({
			"display": "block",
    		"left": tagTarget[tagIndex].left + "px",
    		"top": tagTarget[tagIndex].top + "px"
    	});

		// Animate
        for(var i = 0; i < length; i++){
			$(tagNames[i]).delay(i*100).animate({
					"left": tagInitial[i].left + "px",
					"top": tagInitial[i].top + "px"
				}
			);
		}

		$(".prompt").delay(550).animate({
        		"left": promptLeft + 'px',
        		"top" : '270px'
        	}
        );

    });

});

function getNextFill(currentFill){
	switch(currentFill){
		case "fill-in-1":
			state = 1;
			return "fill-in-2";
			break;
		case "fill-in-2":
			state = 2;
			return "fill-in-3";
			break;
		case "fill-in-3":
			state = 3;
			break;
	}
}