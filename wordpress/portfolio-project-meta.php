<?php
/**
 * Plugin Name: Portfolio Project Meta
 * Description: Registers custom meta fields for the "project" CPT and exposes them via the REST API.
 * Version: 1.0.0
 * Author: Faisal
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register project meta fields and expose them in the REST API.
 *
 * Uses register_post_meta() which automatically adds each field
 * to the "meta" object in REST API responses.
 *
 * API response will include:
 * {
 *   "meta": {
 *     "project_url": "https://example.com",
 *     "github_url": "https://github.com/...",
 *     "tech_stack": "React, Next.js, WordPress",
 *     "client_name": "Client Name"
 *   }
 * }
 */
function portfolio_register_project_meta() {
    $meta_fields = array(
        'project_url' => array(
            'type'        => 'string',
            'description' => 'Live project URL',
            'default'     => '',
        ),
        'github_url' => array(
            'type'        => 'string',
            'description' => 'GitHub repository URL',
            'default'     => '',
        ),
        'tech_stack' => array(
            'type'        => 'string',
            'description' => 'Comma-separated list of technologies used',
            'default'     => '',
        ),
        'client_name' => array(
            'type'        => 'string',
            'description' => 'Client or project owner name',
            'default'     => '',
        ),
    );

    foreach ( $meta_fields as $key => $args ) {
        register_post_meta( 'project', $key, array(
            'type'              => $args['type'],
            'description'       => $args['description'],
            'single'            => true,
            'default'           => $args['default'],
            'show_in_rest'      => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback'     => function () {
                return current_user_can( 'edit_posts' );
            },
        ) );
    }
}
add_action( 'init', 'portfolio_register_project_meta' );
