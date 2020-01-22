<?php
namespace JWIF;

class Admin {
  public function __construct($plugin) {
    $this->core = $plugin;

    add_action('admin_menu', [$this, 'addOptionsPage']);
    add_action('admin_enqueue_scripts', function() {
      $url = $this->core->pluginUrl;

      wp_enqueue_script('jwif-admin', $url . 'dist/admin.js', [], $this->core->version, true);
      wp_enqueue_style('jwif-admin', $url . 'dist/admin.css', [], $this->core->version);
    });
  }

  public function addOptionsPage() {
    add_options_page(
      'Job openings settings',
      'Job openings',
      'edit_posts',
      'jwif_options',
      [$this, 'renderOptionsPage']
    );
  }

  public function renderOptionsPage() {
    if (!empty($_POST)) {
      if (!isset($_POST['_wpnonce']) || ! wp_verify_nonce($_POST['_wpnonce'], 'jwif_save_settings')) {
        wp_die('Invalid nonce.');
      }

      $this->core->saveSettings([
        'region' => (int) $_POST['region'],
        'perPage' => (int) $_POST['perPage'],
      ]);
    }

    $settings = $this->core->getSettings();
    ?>

    <form method="POST">
      <h1>Job opening settings</h1>

      <?php
      wp_nonce_field('jwif_save_settings');

      foreach ($settings as $name => $value) {
        switch ($name) {
          case 'region':
            $this->renderOptionRegion($value);
          break;

          case 'perPage':
            $this->renderOptionPerPage($value);
          break;

          default:
            error_log("Unknown setting $name, value " . print_r($value, true));
          break;
        }

        echo "<hr>";
      }

      ?>
      <input type="submit" value="Save">
    </form>
    <?php

    $this->renderCampaigns();
    $this->renderHelp();
  }

  public function renderOptionRegion($currentRegionId) {
    $regions = $this->core->api->getRegions();
    ?>
    <label>
      <strong>Region</strong>

      <select name="region">
        <?php foreach ($regions['data'] as $region) {
          $selected = $currentRegionId === $region->id ? 'selected' : '';

          echo "<option value='{$region->id}' $selected>";
          echo $region->name;
          echo "</option>";
        } ?>
      </select>
    </label>
    <?php
  }

  public function renderOptionPerPage($current) {
    $options = range(8, 30);
    ?>
    <label>
      <strong>Per page</strong>

      <select name="perPage">
        <?php foreach ($options as $value) {
          $selected = $current === $value ? 'selected' : '';

          echo "<option value='$value' $selected>";
          echo $value;
          echo "</option>";
        } ?>
      </select>
    </label>
    <?php
  }

  public function renderCampaigns() {
    $campaigns = $this->core->api->getCampaigns();

    ?>
    <div>
      <h3>Available campaigns</h3>

      <?php foreach ($campaigns['data'] as $campaign) {
        $id = esc_attr($campaign->id);
        $name = esc_html($campaign->name);

        echo "<p>$name: <code>[job-openings campaign=$id]</code></p>";
      } ?>
    </div>
    <?php
  }

  public function renderHelp() {
    ?>
    <div>
      <p>Insert the shortcode anywhere you wish to render a listing of job openings. You can configure the shortcode with the following parameters:</p>

      <ul>
        <li>
          Default shortcode. Example: <br />
          <code>[job-openings]</code>
        </li>

        <li>
          perPage: Controls the amount of jobs in a listing page. Example: <br />
          <code>[job-openings perPage=5]</code>
        </li>

        <li>
          showfilters: Disable filtering of a listing. Example: <br />
          <code>[job-openings showfilters=false]</code>
        </li>

         <li>
          showloadmore: Hide load more button. Example: <br />
          <code>[job-openings showloadmore=false]</code>
        </li>

        <li>
          category: Show listing from a spesific category. Example: <br />
          <code>[job-openings category=60]</code>
        </li>
      </ul>

      <p>You can combine multiple parameters into a single shortcode, like so:<br>
      <code>[job-openings category=60 perPage=10 showfilters=false showloadmore=false]</code></p>
    </div>
    <?php
  }
}