(function($) {

    var $editor = $('#editor'),
        $code = $('#code'),
        $liquid = $('#liquid'),
        $css = $('#css'),
        $js = $('#js'),
        $template = $('#template'),
        $product = $('#product'),
        queryParameters = $.getQueryParameters();

    // On load, populate the ID input correctly.
    if('droplet' in queryParameters) {
        var dropletID = queryParameters['droplet'];
        $code.val(dropletID);
        $.getJSON('/apps/droplet/droplets/' + dropletID, function(droplet) {
            $liquid.val(droplet.liquid);
            $css.val(droplet.css);
            $js.val(droplet.js);
            $template.val(droplet.template);
            $product.val(droplet.product);
        });
    } else {
        $code.val(Math.random().toString(36).substring(6));
    }

    // On load, initialise CodeMirrors
    var jsCodeMirror = CodeMirror.fromTextArea($js.get(0), {
        mode: 'javascript',
        lineNumbers: true
    });
    var cssCodeMirror = CodeMirror.fromTextArea($css.get(0), {
        mode: 'css',
        lineNumbers: true
    });
    var liquidCodeMirror = CodeMirror.fromTextArea($liquid.get(0), {
        mode: 'html',
        lineNumbers: true
    });

    // Intercept the submit event to AJAXify our request.
    $editor.submit(function(e) {
        e.preventDefault();
        $.post('/apps/droplet/droplets', $editor.serialize(), function(e) {
          if (e.template === "index") {
            $("#preview").attr("src", window.location.href + "?view=" + e.code)
          } else if (e.template === "collection") {
            $("#preview").attr("src", window.location.href + "collection/all/?view=" + e.code)
          } else if (e.template === "product") {
            $("#preview").attr("src", window.location.href + "products/" + e.product + "?view=" + e.code)
          } else {
            alert("hmmm... what do to now?");
          }

        });
    });

}(jQuery));
