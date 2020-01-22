<?php
namespace JWIF;

class Frontend {
  public $shortcodeRendered = false;
  public function __construct($plugin) {
    $this->core = $plugin;

    add_shortcode('job-openings', [$this, 'renderShortcode']);

    add_action('wp_enqueue_scripts', function() {
      $url = $this->core->pluginUrl;

      wp_enqueue_script('jwif-frontend', $url . 'dist/frontend.js', [], $this->core->version, true);
      wp_enqueue_style('jwif-frontend', $url . 'dist/frontend.css', [], $this->core->version);

      wp_localize_script('jwif-frontend', 'jwif', [
        'adminAJAX' => admin_url('admin-ajax.php'),
        'noResultsText' => apply_filters('jwif_no_results_text', 'No results. Come back later or try different parameters.'),
      ]);
    });

    add_action('wp_ajax_jwif_loadmore', [$this, 'loadMore']);
    add_action('wp_ajax_nopriv_jwif_loadmore', [$this, 'loadMore']);
  }

  public function renderShortcode($attributes) {
    if ($this->shortcodeRendered) {
      if (current_user_can('edit_posts')) {
        return "<p><code>[job-openings]</code> shortcode can only be used once on a page to guarantee a good user experience. <br>
        <small>This notice is only visible to admin users of this site.</small></p>";
      }

      return;
    }

    $settings = $this->core->getSettings();
    $attributes = shortcode_atts([
      'perpage' => $settings['perPage'],
      'region' => $settings['region'],
      'showfilters' => true,
      'showloadmore' => true,
      'category' => null,
    ], $attributes);

    // Force data types, shortcodes operate with lowercase strings only
    $attributes['showfilters'] = $attributes['showfilters'] === 'false' ? false : true;
    $attributes['showloadmore'] = $attributes['showloadmore'] === 'false' ? false : true;
    $attributes['perPage'] = (int) $attributes['perpage'];
    $attributes['region'] = (int) $attributes['region'];
    $attributes['category'] = (int) $attributes['category'];

    unset($attributes['perpage']);

    $this->shortcodeRendered = true;
    return $this->renderListing($attributes);
  }

  public function renderListing($atts = []) {
    $options = [
      'job-region' => $atts['region'],
      'per_page' => $atts['perPage'],
    ];

    if ($atts['category']) {
      $options['job-category'] = $atts['category'];
    }

    $showFilters = $atts['showfilters'];
    $showLoadMore = $atts['showloadmore'];
    $page = 1;
    $perPage = esc_attr($options['per_page']);
    $region = esc_attr($options['job-region']);
    $category = esc_attr(isset($options['job-category']) ? $options['job-category'] : 0);

    if ($showFilters) {
      $request = $this->core->api->getCategories();
      $categories = $request['data'];
    }

    $request = $this->core->api->getOpenings($page, $options);
    $jobs = $request['data'];

    $total = esc_attr($request['total']);
    $totalPages = esc_attr($request['totalPages']);

    ob_start();

    echo "<div id='jwif-shortcodelist'>";
    echo "<div class='jwif-listing' data-region='$region' data-total='$total' data-totalpages='$totalPages' data-page='$page' data-perpage='$perPage' data-category='$category'>";
      if ($showFilters) {
        echo "<div class='jwif-listing__filters'>";

          foreach ($categories as $cat) {
            if ($cat->count === 0) {
              continue;
            }

            $id = esc_attr($cat->id);
            $filterTarget = 'category'; // For future proofing. If there will be different kind of filters in the future.
            echo "<button class='jwif-listing__filter' data-filtertarget='$filterTarget' data-category='{$id}'>";
            echo esc_html($cat->name);
            echo "</button>";
          }

          echo "<button class='jwif-listing__filter jwif-listing__filter--reset'>Reset filters</button>";
        echo "</div>";
      }

      echo "<div class='jwif-listing__jobs'>";
      foreach ($jobs as $job) {
        $this->renderJob($job);
      }
      echo "</div>";

      if ($totalPages > 1 && $showLoadMore) {
        echo "<div class='jwif-listing__more'>";
          echo "<button class='jwif-listing__more--button'>";
            echo __('Load more', 'jwif');
            echo "<span class='loader'>Loading...</span>";
          echo "</button>";
        echo "</div>";
      }

     echo "</div>";
     echo "</div>";

     return ob_get_clean();
  }

  public function renderJob($job = []) {
    ?>
    <a href="<?=esc_url($job->{'wifjb_direct_link'})?>" target="_blank" rel="noopener noreferrer" class="jwif-listing__job">
      <div class="jwif-listing__job__logo" style="background-image: url('<?=esc_url($job->{'wifjb_logo'})?>');">
        <!-- <img src="" alt="company logo" /> -->
      </div>

      <div class="jwif-listing__job__data">
        <h3><?=$job->{'title'}->rendered?></h3>

        <span class="jwif-listing__job__location">
          <?=esc_html($job->{'wifjb_location'})?>
        </span>
      </div>
    </a>
    <?php
  }

  public function loadMore() {
    $options = [];
    $options['per_page'] = (int) $_POST['perPage'];
    $options['job-region'] = (int) $_POST['region'];

    if ((int) $_POST['category'] !== 0) {
      $options['job-category'] = $_POST['category'];
    }

    $page = (int) $_POST['page'];
    $request = $this->core->api->getOpenings($page, $options);

    $data = $request['data'];
    $total = esc_attr($request['total']);
    $totalPages = esc_attr($request['totalPages']);

    header("X-Total: $total");
    header("X-Total-Pages: $totalPages");

    foreach ($data as $job) {
      $this->renderJob($job);
    }

    die();
  }
}
