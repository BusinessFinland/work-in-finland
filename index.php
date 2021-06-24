<?php
/**
 * Plugin Name:     Jobs Work In Finland
 * Description:     Fetch Job Openings from jobs.workinfinland.fi
 * Text Domain:     jwif
 * Domain Path:     /languages
 * Version:         0.3
 *
 * @package         Jobs_Workinfinland
 */

require_once 'classes/class.main.php';

$plugin = new JWIF\Main(__FILE__, get_file_data(__FILE__, ['Version'], 'plugin')[0]);
