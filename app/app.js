const { Subject } = require("rxjs");

(($)=>{

   let routes = {
      base: { file:'base.html', path:"base" },
      home: { file:'home.html', path:"home" },
      notHome: { file:'not-home.html', path:"notHome" }
   };

   $('#homeButton').on('click',(e)=>{ loadRoute(routes.home) });
   $('#notHomeButton').on('click',(e)=>{ loadRoute(routes.notHome) });

   window.onpopstate = function(e){
      if(e.state){
          $('#content').html("").append(e.state.html);
          document.title = e.state.pageTitle;
      }
   };
   
   function loadRoute(route){
      $.ajax({
         url:'./templates/'+route.file,
         success:(template)=>{
            let $base = template;
            $('#content').html("").append($base);
            window.history.pushState({"html":template,"pageTitle":route.name},"", route.path);
         }
      });
   } 

})(jQuery);