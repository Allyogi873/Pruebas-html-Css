document.addEventListener("arlojscontrolsloaded", function () {
	var platformID = "codependemocompany.arlo.co";

	var categoryEventFilter = {
		moduleType: "Filters",
		targetElement: "#arlo-event-filter",
		template: "#filter-template",
		filterControlId: 2,
	};

	var catalogue = {
		moduleType: "CategoryCatalogue",
		targetElement: "#arlo-catalogue",
		template: "#catalogue-template",
		categoryFilterType: "facet",
		categoryFilterTarget: "#arlo-catalogue-filter",
		nextRunningEventFilterControlId: 2,
		maxNextRunningEvents: 1,
		loadNextRunningButtonText: "Find Events",
		includeLoadMoreButton: true,
		loadMoreButtonText: "Show More Categories",
		nextRunningEventTemplate: "#event-template",
		maxCount: 5,
		header: {
			targetElement: "#arlo-category-header",
			template: "#category-header-template",
		},
		footer: {
			targetElement: "#arlo-category-footer",
			template: "#category-footer-template",
		},
	};

	var app = new window.ArloWebControls();

	app.start({
		platformID: platformID,
		showDevErrors: true,
		modules: [catalogue, categoryEventFilter],
	});

	window.loadedFilters = 0;
});

/* ----- Callback functions ----- */

// Events "OnShow" callback
window.categoryItemsOnShow = function (getRenderCollectionElements, $) {
	var listItems = getRenderCollectionElements();
	var listParent = $(listItems[0]).parent()[0];

	var cardSummary = $(".arlo-summary");
	var strMaxLength = 350;

	$.each(cardSummary, function (index, item) {
		var str = $(item).text();
		$(item).text(strChopper(str));
    
    			// Images placeholders on load
			var listItemWithImage = $(item).find(".arlo-catalogueitem-image.with-image")
			listItemWithImage.each(function(){
				var src = listItemWithImage.css("background-image");
				if(src.length>0){
					var url = src.match(/\((.*?)\)/)[1].replace(/('|")/g, "");
					var img = new Image();
					img.onload = function () {
						listItemWithImage.removeClass("image-loading");
						listItemWithImage.parent().find(".arlo-image-placeholder").css("opacity", "0");
						setTimeout(function () {
							listItemWithImage.parent().find(".arlo-image-placeholder").remove();
						}, 500);
					};
					img.src = url;
					if (img.complete) {
						img.onload();
					}
				}
			});
	});

	function strChopper(str) {
		if (str.length > strMaxLength) {
			str = str.substring(0, strMaxLength) + "...";
		}
		return str;
	}

	ElementQueries.init();

	// Image loading placeholder
	(function loadArloImages() {
		$(".arlo-eventtemplatecategoryitems-listitem .arlo-catalogueitem-image.with-image").each(function () {
			var listItem = $(this);
			var src = listItem.css("background-image");
			var url = src.match(/\((.*?)\)/)[1].replace(/('|")/g, "");
			var img = new Image();
			img.onload = function () {
				listItem.removeClass("image-loading");
				listItem.parent().find(".arlo-image-placeholder").css("opacity", "0");
				setTimeout(function () {
					listItem.parent().find(".arlo-image-placeholder").remove();
				}, 1000);
			};
			img.src = url;
			if (img.complete) {
				img.onload();
			}
		});
	})();
	// Set all list items to height of tallest item plus padding
	function setEventTemplateListItemHeight() {
		if ($(listParent).width() < 600) {
			return;
		}
		$(listParent).find(".arlo-listitem").height("auto");
		var tallestListItemHeight = 0;
		$.each($(listParent).find(".arlo-listitem"), function (index, listItem) {
			// Get height from combining heights of list item elements (because of issue with using listitems own height)
			var height = 0;
			height += $(listItem).find(".arlo-title").height();
			height += $(listItem).find(".arlo-summary").height();
			height += $(listItem).find(".arlo-advertisedduration").height();
			height += $(listItem).find(".arlo-offer-container").height();
			height += $(listItem).find(".arlo-delivery-title").height();
			height += $(listItem).find(".arlo-templatetags").height();
			height += $(listItem).find(".arlo-next-running-title").height();
			height += $(listItem).find(".arlo-next-running-wrapper").height();

			if (height > tallestListItemHeight) {
				tallestListItemHeight = height;
			}
		});
		$(listParent)
			.find(".arlo-listitem")
			.height(tallestListItemHeight + 95);
	}

	setTimeout(function () {
		setEventTemplateListItemHeight();
	}, 0);

	$(window).resize(function () {
		setEventTemplateListItemHeight();
	});

	// Reset wrapper to static position
	$(".arlo-catalogue-wrapper").css("position", "static");
};

window.onFilterLoad = function () {
	if (window.loadedFilters == 0) {
		$("#arlo-filter-toggle").click(function () {
			$(this).parent().toggleClass("arlo-show-filter");
		});
		window.loadedFilters++;
	}
};
