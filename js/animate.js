
var tagNames = ["#tag-1", "#tag-2", "#tag-3", "#tag-4", "#tag-5"];
var tagSelectedNames = ["#tag-selected-1", "#tag-selected-2", "#tag-selected-3"];
var tagDistance = 900;
var selTagDistance = 500;
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

var selectedTagTarget = [
	{
		top: 495,
		left: 444
	},
	{
		top: 495,
		left: 280
	},
	{
		top: 495,
		left: 608
	}
];

var selectedTagHide = [
	{
		top: 495 + selTagDistance,
		left: 444
	},
	{
		top: 495 + selTagDistance,
		left: 280
	},
	{
		top: 495 + selTagDistance,
		left: 608
	}
];

var inner = [
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
	}	
];

// States
var currentSelectedTag;
var currentFill;
var nextFill;
var state = 1;
var collectionOn = false;


$(document).ready(function(){
	
	// Hex Initialization
	var length = tagNames.length;
	var selLength = tagSelectedNames.length;

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
    	nextFill = getNextFill(currentFill.attr("id"));
    	// console.log(state);
    	currentSelectedTag = $(tagSelectedNames[state-1]);
    	// console.log(currentSelectedTag);

    	// Move Image Tag Downwards
        for(var i = 0; i < selLength; i++){
        	$(tagSelectedNames[i]).animate({
	        		"left": selectedTagHide[i].left + "px",
					"top": selectedTagHide[i].top + "px"
	        	}
	        );
        }

        $(".prompt").animate({
        		"left": '50px',
        		"top" : '50px'
        	}
        );

        animateTagTarget();
        function animateTagTarget(){
        	for(var i = 0; i < length; i++){  	
				$(tagNames[i]).delay(100 + (length - i) * 150).animate({
						"left": tagTarget[i].left + "px",
						"top": tagTarget[i].top + "px"
					}
				);
			}
        }
       

    });

    // Click function for tag
    $(".tag").click(function(){   		
    	// nextFill = getNextFill(currentFill.attr("id"));
    	// console.log(state);

    	var thisTag = $(this);

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

		// Move the Selected Tag to Location of 'Selected' Tag
		var tagIndex = tagNames.indexOf("#" + $(this).attr("id"));
		$(currentSelectedTag).css({
			"display": "block",
    		"left": tagTarget[tagIndex].left + "px",
    		"top": tagTarget[tagIndex].top + "px"
    	});

		// Copy HTML of Selected Tag
		var selectedTagString = thisTag.children().html();
		$(currentSelectedTag).children().html(selectedTagString);
    	console.log(selectedTagString);

		// Vanish the selected tag 
    	$(this).css({
    		"display": "none"
    	});

		// Animate
        for(var i = 0; i < length; i++){
			$(tagNames[i]).delay(i*100).animate({
					"left": tagInitial[i].left + "px",
					"top": tagInitial[i].top + "px"
				},
				function(){
					// Callback
					$(this).css({
			    		"display": "block"
			    	});

					
				}
			);
		}

		// Animation
		// Prompt Animation on Callback
    	$(".prompt").delay(700).animate({
        		"left": promptLeft + 'px',
        		"top" : '270px'
        	}, function(){console.log("Animation-1 Done")}
        );

        // Selected Tag Animation on Callback
        $(currentSelectedTag).delay(700).animate({
				"left": selectedTagTarget[state-1].left + 'px',
	        	"top" : selectedTagTarget[state-1].top + 'px'
	    	}, function(){console.log("Animation-2 Done")}
    	);

        console.log(state);

        for(var i = 0; i < selLength; i++){
        	if(i != state-1){
        		$(tagSelectedNames[i]).delay(700).animate({
						"left": selectedTagTarget[i].left + 'px',
			        	"top" : selectedTagTarget[i].top + 'px'
			    	}
				);
        	}
        }
		// 
    });

	// Override Collection
	$(document).click(function(e){

		if(collectionOn==true){
			if( $(e.target).closest(".collection").length > 0 ) {
		        
		    }

		    else{
		    	collectionOn = false;
		    	console.log("Close");

		    	// Move Image Tag Downwards
		        for(var i = 0; i < selLength; i++){
		        	$(tagSelectedNames[i]).animate({
			        		"left": selectedTagTarget[i].left + "px",
							"top": selectedTagTarget[i].top + "px"
			        	}, function(){
			        		// Callback

			        		$(currentSelectedTag).css({
								"display": "block",
					    	});
			        	}
			        );
		        }

		    }
		}
	    
	    
	    
	});

	// Click function for Collection
    $(".tag-selected").click(function(){       	

    	currentSelectedTag = this;

    	$(".collection").css({
			"display": "block",
			"left": $(this).css("left"),
			"top": $(this).css("top")
    	});

    	// Hide the Selected Tag
		$(currentSelectedTag).css({
			"display": "none",
    	});

    	// Move Image Tag Downwards
        for(var i = 0; i < selLength; i++){
        	$(tagSelectedNames[i]).animate({
	        		"left": selectedTagHide[i].left + "px",
					"top": selectedTagHide[i].top + "px"
	        	}, function(){
	        		// Callback
	        		collectionOn = true;  
	        		console.log(collectionOn);

	     //    		$(currentSelectedTag).css({
						// "display": "block",
			   //  	});
	        	}
	        );
        }

   //  	$(currentSelectedTag).css({
			// "display": "block",
   //  		"left": tagTarget[tagIndex].left + "px",
   //  		"top": tagTarget[tagIndex].top + "px"
   //  	});
		
    });

	// Collection End

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