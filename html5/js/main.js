// ==========This loads the javascript files in an acceptable order. ==========

function loadScript(path, callback) {
  const scriptTag = document.createElement("script");
  scriptTag.src = path;
  scriptTag.onload = callback;
  document.body.appendChild(scriptTag);
}

function include(filePath) {
    const scriptTag = document.createElement("script");
    scriptTag.src = filePath;
    document.body.appendChild(scriptTag);
}

function startPage() {
include("js/captionsid.js"); 
include("js/captionshu.js");
include("js/captionsen.js");
include("js/mavir_august.js");
include("js/mavir_january.js");
include("js/drawppts.js");
include("js/drawings.js");
include("js/drawCapacities.js");
include("js/drawPriorities.js");
include("js/cycle.js");   
include("js/statist.js");
include("js/KeyPressed.js");
include("js/pptPanel.js");
include("js/simulationControl.js");
include("js/sun_august.js");
include("js/sun_january.js");
include("js/variables.js");    
include("js/general.js");
};
