<?php
namespace JWIF;

class API {
  public $url = 'https://careerinfinland.fi-p.seravo.com/wp-json/wp/v2/';

  public function __construct($plugin) {
    $this->core = $plugin;
  }

  public function get($url, $transientSettings = []) {
    $useTransient = isset($transientSettings['key']);

    if ($useTransient) {
      $key = $transientSettings['key'];
      $expiry = $transientSettings['expiry'];
      $transient = get_transient($key);

      if ($transient) {
        return $transient;
      }
    }

    $response = wp_remote_get($this->url . $url, [
      'timeout' => 10,
    ]);

    if (is_wp_error($response)) {
      return $response;
    }

    $response['body'] = json_decode($response['body']);

    if ($useTransient) {
      set_transient($key, $response, $expiry);
    }

    return $response;
  }

  public function parseHeaders(&$response) {
    $headers = $response['headers']->getAll();
    $total = (int) $headers['x-wp-total'];
    $totalPages = (int) $headers['x-wp-totalpages'];

    return [$total, $totalPages];
  }

  public function getRegions($page = 1) {
    $response = $this->get("job-region?per_page=100&page=$page");
    list($total, $totalPages) = $this->parseHeaders($response);

    $data = $response['body'];
    return compact("data", "total", "totalPages");
  }

  public function getCampaigns($page = 1) {
    $response = $this->get("job-campaign?per_page=100&page=$page");
    list($total, $totalPages) = $this->parseHeaders($response);

    $data = $response['body'];
    return compact("data", "total", "totalPages");
  }

  public function getCategories($page = 1) {
    $settings = $this->core->getSettings();

    $url = "job-category?per_page=100&page=$page&job-region=$settings[region]";
    $response = $this->get($url, [
      'expiry' => \MINUTE_IN_SECONDS * 15,
      'key' => $url,
    ]);
    list($total, $totalPages) = $this->parseHeaders($response);

    $data = $response['body'];
    return compact("data", "total", "totalPages");
  }

  // public function getOpenings($page = 1) {
  public function getOpenings($page = 1, $options = []) {
    $settings = $this->core->getSettings();
    $options = array_merge($options, ['page' => $page]);
    $query = \http_build_query($options);
    $url = "job-opening?$query";

    $response = $this->get($url, [
      'expiry' => \MINUTE_IN_SECONDS * 5,
      'key' => $url,
    ]);
    list($total, $totalPages) = $this->parseHeaders($response);

    $data = $response['body'];
    return compact("data", "total", "totalPages");
  }
}
