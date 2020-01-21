<?php
namespace JWIF;

class Main {
  public $admin;
  public $frontend;
  public $api;

  public $pluginUrl;
  public $version;

  public function __construct($pluginFile, $version) {
    $this->admin = $this->loadAdmin();
    $this->frontend = $this->loadFrontend();
    $this->api = $this->loadApi();

    $this->pluginUrl = plugin_dir_url($pluginFile);
    $this->version = $version;

    if (is_admin()) {
      require __DIR__ . '/../plugin-update-checker/plugin-update-checker.php';
      $updateChecker = \Puc_v4_Factory::buildUpdateChecker(
        'https://github.com/BusinessFinland/work-in-finland',
        $pluginFile,
        'work-in-finland-master'
      );

      //Optional: If you're using a private repository, specify the access token like this:
      //$updateChecker->setAuthentication('xxxxxxxxxxxx');
      //$updateChecker->setBranch('master');
    }
  }

  public function loadAdmin() {
    require_once 'class.admin.php';

    return new Admin($this);
  }

  public function loadFrontend() {
    require_once 'class.frontend.php';

    return new Frontend($this);
  }

  public function loadApi() {
    require_once 'class.api.php';

    return new API($this);
  }

  public function getSettings() {
    $defaults = [
      'region' => 72, // Helsinki,
      'perPage' => 20,
    ];

    return get_option('jwif_settings', $defaults);
  }

  public function saveSettings($data = []) {
    $settings = array_replace_recursive($this->getSettings(), $data);

    return update_option('jwif_settings', $settings);
  }
}