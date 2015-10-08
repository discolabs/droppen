/**
 * app.js
 * Application-specific code for the DropPen code editor.
 */
var DropPen = (function($) {

    // Declare variables local to the DropPen module.
    var DropPen = {},
        $editor, $content, $code, $liquid, $css, $js, $preview, $template, $product, $productFormGroup, $liquidHelp, $liquidHelpFilter,
        jsCodeMirror, cssCodeMirror, liquidCodeMirror,
        dropletCode, queryParameters, liquidKeywords;

    /***************************
     * Initialisation and setup.
     ***************************/

    /**
     * Initialise DropPen.
     */
    function init(initialLiquidKeywords) {
        liquidKeywords = initialLiquidKeywords;
        setupElementReferences();
        setupDropletCode();
        setupCodeMirrors();
        setupEventHandlers();
        setupKeymaster();
        setupList();
    }

    /**
     * Create jQuery references to various important DOM elements on the page.
     */
    function setupElementReferences() {
        $editor = $('#editor');
        $code = $('#code');
        $content = $('#content');
        $liquid = $('#liquid');
        $css = $('#css');
        $js = $('#js');
        $preview = $('#preview');
        $template = $('#template');
        $product = $('#product');
        $productFormGroup = $('#product-form-group');
        $liquidHelp = $('#liquid-help');
        $liquidHelpFilter = $('#liquid-help-filter');
    }

    /**
     * Ensure we have a Droplet code for this "session", based on the query
     * parameters. If no Droplet code is available, create a random one.
     */
    function setupDropletCode() {
        queryParameters = $.getQueryParameters();

        // Try to fetch the droplet code from the query parameters.
        // If it exists in the query parameters, attempt to load it.
        if('droplet' in queryParameters) {
            dropletCode = queryParameters['droplet'];
            loadDroplet();
        }

        // If we still don't have a valid droplet code, generate a random one.
        if(!dropletCode) {
            dropletCode = Math.random().toString(36).substring(6);
        }

        // Store the Droplet code in the form element.
        $code.val(dropletCode);
    }

    /**
     * Initialise CodeMirror on <textarea> elements.
     */
    function setupCodeMirrors() {
        var extraKeys = {
          'Ctrl-/': toggleLiquidHelp,
          'Cmd-/': toggleLiquidHelp
        };
        jsCodeMirror = CodeMirror.fromTextArea($js.get(0), {
            mode: 'javascript',
            lineNumbers: true,
            extraKeys: extraKeys
        });
        cssCodeMirror = CodeMirror.fromTextArea($css.get(0), {
            mode: 'css',
            lineNumbers: true,
            extraKeys: extraKeys
        });
        liquidCodeMirror = CodeMirror.fromTextArea($liquid.get(0), {
            mode: 'htmlmixed',
            lineNumbers: true,
            extraKeys: extraKeys
        });
    }

    /**
     * Register event handlers.
     */
    function setupEventHandlers() {
        // jQuery event handlers.
        $editor.on('submit', formSubmitted);
        $template.on('change', templateChanged);
        $preview.on('load', loadingComplete);
        $(document).on('click', '[href="#liquid-help"]', toggleLiquidHelp);
    }

    /**
     * Set up Keymaster shortcuts.
     */
    function setupKeymaster() {
        key.filter = function(event) {
            var tagName = (event.target || event.srcElement).tagName;
            return !(tagName == 'SELECT' || tagName == 'TEXTAREA');
        };

        key('⌘+/, ctrl+/', toggleLiquidHelp);
        key('esc', closeLiquidHelp);
    }

    /**
     * Set up list filtering.
     */
    function setupList() {
        var options = {
            item: '<li><span class="keyword"></span><span class="description"></span></li>'
        };

        // Initialise the List.
        new List('liquid-help', options, liquidKeywords);
    }

    /******************
     * General methods.
     ******************/

    /**
     * Load the current droplet via an Ajax GET request.
     */
    function loadDroplet() {
        loadingStarted();
        $.getJSON('/apps/droppen/droplets/' + dropletCode)
            .done(function(droplet) {
                $liquid.val(droplet.liquid);
                $css.val(droplet.css);
                $js.val(droplet.js);
                $template.val(droplet.template);
                $product.val(droplet.product);
                previewDroplet(droplet);
            })
            .fail(function() {
                loadingComplete();
                alert('Sorry! An error occurred loading this DropPen.');
            });
    }

    /**
     * Save the current Droplet via an Ajax POST request.
     */
    function saveDroplet() {
        loadingStarted();
        $.post('/apps/droppen/droplets', $editor.serialize())
            .done(function(droplet) {
                previewDroplet(droplet);
            })
            .fail(function() {
                loadingComplete();
                alert('Sorry! An error occurred running this DropPen.');
            });
    }

    /**
     * Load the droplet preview based on the current editor state.
     */
    function previewDroplet(droplet) {
        var previewUrlPath = {
            'index': '',
            'collection': 'collection/all/',
            'product': 'products/' + droplet.product
        };

        // Update the source of the preview iframe.
        $preview.attr('src', window.location.href + previewUrlPath[droplet.template] + '?view=' + droplet.code);
    }

    /*****************
     * Event handlers.
     *****************/

    /**
     * Event handler for when the DropPen form is submitted (ie, the "Run"
     * button is clicked).
     *
     * @param e
     */
    function formSubmitted(e) {
        e.preventDefault();
        saveDroplet();
    }

    /**
     * Event handler for when the "Template" select dropdown changes.
     *
     * @param e
     */
    function templateChanged(e) {
        if($template.val() === 'product') {
            $productFormGroup.show().attr('disabled', null);
        } else {
            $productFormGroup.hide().attr('disabled', 'disabled');
        }
    }

    /**
     * Event handler for when loading starts.
     */
    function loadingStarted() {
        $editor.addClass('loading');
        $editor.find(':input').prop('disabled', true);
    }

    /**
     * Event handler for when loading is complete.
     */
    function loadingComplete() {
        $editor.removeClass('loading');
        $editor.find(':input').prop('disabled', false);
    }

    /**
     * Open / close the Liquid help overlay.
     */
    function toggleLiquidHelp(e) {
        if(e.preventDefault) {
            e.preventDefault();
        }
        if($liquidHelp.hasClass('open')) {
            closeLiquidHelp();
        } else {
            openLiquidHelp();
        }
    }

    /**
     * Open the Liquid help overlay.
     */
    function openLiquidHelp() {
        $liquidHelp.addClass('open');
        $content.removeClass('open');
        $liquidHelpFilter.focus();
    }

    /**
     * Close the Liquid help overlay.
     */
    function closeLiquidHelp() {
        $liquidHelp.removeClass('open');
        $content.addClass('open');
        $liquidHelpFilter.val('');
    }

    // Export public methods and the module.
    DropPen.init = init;
    return DropPen;

}(jQuery));
