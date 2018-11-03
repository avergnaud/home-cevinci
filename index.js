(function() {
  "use strict";

  /* GESTION DU MENU scrollspy */
  var section = document.querySelectorAll("section");
  var sections = {};
  var i = 0;

  Array.prototype.forEach.call(section, function(e) {
    sections[e.id] = e.offsetTop - 200;
  });

  var links = document.querySelectorAll("#carte #menu li a");

  var regions = document.querySelectorAll(".region");

  window.onscroll = function() {
    var scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;

    for (i in sections) {
      if (sections[i] <= scrollPosition) {
        //document.querySelector(".active").setAttribute("class", " ");
        if(document.querySelector(".active")) {
          document.querySelector(".active").classList.remove('active');
        }
        document
          .querySelector("a[href*=" + i + "]")
          .setAttribute("class", "active");

        for (var j = 0; j < regions.length; ++j) {
          if ("toutes-les-regions" == i) {
            regions[j].classList.remove("hidden");
          } else {
            regions[j].classList.add("hidden");
          }
        }
        for (var k in pathsByRegions[i]) {
          document
            .querySelector("path[id='" + pathsByRegions[i][k] + "']")
            .setAttribute("class", "region");
        }
      }
    }

    for(var l=0; l<links.length; ++l) {
      if(links[l].offsetTop > 670 - scrollPosition) {
        links[l].classList.remove("white-link");
      } else {
        links[l].classList.add("white-link");
      }
    }
  };

  var pathsByRegions = {
    alsace: ["path3543", "path5507", "path3541"],
    armagnac: ["path3497"],
    bordeaux: ["path4133"],
    bourgogne: ["path3515", "path3517"],
    champagne: ["path3513", "path5501", "path5503"],
    cognac: ["path3475", "path5505"],
    corse: ["path3325", "path3333", "path3335", "path3337", "path3339"],
    jura: ["path3519"],
    languedoc: ["path3507"],
    provence: ["path3537", "path3539"],
    savoie: ["path3521", "path3523", "path3525", "path3527"],
    "sud-ouest": [
      "path3481",
      "path3483",
      "path3485",
      "path3487",
      "path3489",
      "path3491",
      "path3493",
      "path3499",
      "path3495"
    ],
    loire: [
      "path5509",
      "path2651",
      "path2697",
      "path2659",
      "path2661",
      "path2665",
      "path2669",
      "path3471",
      "path3473",
      "path5511",
      "path3469"
    ],
    rhone: ["path3529", "path3531", "path3533", "path3535"]
  };

  // gestion du clic sur les menu items
  /**/
  var menuItems = document.querySelectorAll("#menu li a");
  for(i=0; i<menuItems.length; i++) {
    menuItems[i].addEventListener("click", function(e) {
      e.preventDefault();
      $('html, body').animate({
          'scrollTop' : $("section" + this.attributes["href"].value).position().top
      }, 1000);
    });
  }

  // gestion du clic sur une région + hover
  var regionsByPaths = _.invert(pathsByRegions);
  //
  var paths = document.querySelectorAll("path.region");
  for (i = 0; i < paths.length; i++) {
    //clic
    paths[i].addEventListener("click", function() {
      for(var paths in regionsByPaths) {
        if(paths.includes(this.id)) {
          $('html, body').animate({
            'scrollTop' : $("section#" + regionsByPaths[paths]).position().top
        }, 1000);
        }
      }
    });
    //hover
    paths[i].addEventListener("mouseover", function() {
      
      for(var paths in regionsByPaths) {
        if(paths.includes(this.id)) {
          document
          .querySelector("a[href*=" + regionsByPaths[paths] + "]")
          .classList.add("active");
        }
      }
    });
    paths[i].addEventListener("mouseout", function() {
      
      for(var paths in regionsByPaths) {
        if(paths.includes(this.id)) {
          document
          .querySelector("a[href*=" + regionsByPaths[paths] + "]")
          .classList.remove("active");
        }
      }
    });
  }

  document.querySelector("a[href*=toutes-les-regions]").addEventListener("click", function() {
    for (var j = 0; j < regions.length; ++j) {
      regions[j].classList.remove("hidden");
    }
  });
  
})();
