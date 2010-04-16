// $Id: watchdog_live.js,v 1.3 2009/04/21 14:17:16 naxoc Exp $

Drupal.watchdog = {
  // Attach functionality.
  autoAttach: function() {
    // Grab settings.
    Drupal.watchdog.interval = $('#edit-watchdog-live-interval').val();
    Drupal.watchdog.disabled = $('#edit-watchdog-live-disabled').attr('checked') || 0;
    
    // Interval setting.
    $('#edit-watchdog-live-interval').bind('change', function(event) {
      Drupal.watchdog.saveSetting('interval', this.value);
    });
    
    // Disabled state.
    $('#edit-watchdog-live-disabled').bind('click', function(event) {
      Drupal.watchdog.saveSetting('disabled', this.checked);
      if (!this.checked) {
        Drupal.watchdog.start();
      }
    });
    
    // Handle updating.
    Drupal.watchdog.start();
  },
  
  // Check callback for update and display new content if any.
  load: function() {
    $.get(Drupal.settings.watchdogLive.callback_url, function(data) {
      var result = Drupal.parseJson(data);
      
      // Only if we get content back.
      if (result.content) {
    	  
        var animated = false;
        $('#dblog-filter-form').parent().children().not('#dblog-filter-form').fadeOut('fast', function() {
          // Since we have multiple children, the callback will be called multiple times.
          // Force a stop.
          if (animated) { 
           return false; 
          }
          animated = true;
          
          // Remove old table.
          $('#dblog-filter-form').parent().children().not('#dblog-filter-form').remove();
          
          // Bring in new content.
          $('#dblog-filter-form').parent().append(result.content);
          $('#dblog-filter-form').parent().children().not('#dblog-filter-form').fadeIn('fast');
        });
      }
      
      // Continue the loop.
      Drupal.watchdog.start();
    });
  },
  
  // Save a setting for the configurable options.
  saveSetting: function(name, value) {
    var setting = {};
    setting[name] = value;
    $.post(Drupal.settings.watchdogLive.setting_url, setting);
    Drupal.watchdog[name] = value;
  },
  
  // Start the process.
  start: function() {
    if (!Drupal.watchdog.disabled) {
      Drupal.watchdog.timeoutId = setTimeout(Drupal.watchdog.load, Drupal.watchdog.interval);
    }
  }
  
};

// Global Killswitch.
if (Drupal.jsEnabled) {
  $(document).ready(Drupal.watchdog.autoAttach);
}
