<?php

/**
 * @file
 * Contains \Drupal\unl_contact\Form\ConfigForm.
 */

namespace Drupal\unl_contact\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class ConfigForm
 *
 * @package Drupal\unl_contact\Form.
 */
class ConfigForm extends ConfigFormBase {

  /**
   * @return string
   */
  public function getFormId() {
    return 'unl_contact_config_form';
  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @return array
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $form = parent::buildForm($form, $form_state);
    $config = $this->config('unl_contact.settings');

    $form['contact_phone'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Phone show to visitors'),
      '#default_value' => $config->get('unl_contact.contact_phone'),
    );

    $form['contact_email'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Email show to visitors'),
      '#default_value' => $config->get('unl_contact.contact_email'),
    );
    
    $form['show_map'] = array(
      '#type' => 'checkbox',
      '#title' => $this->t('Show to visitors map?'),
      '#default_value' => $config->get('unl_contact.show_map'),
    );
    
    $form['pets'] = array(
      '#markup' => $this->t('<h2>Pets section</h2>'),
      '#allowed_tags' => ['strong'],
    );
    $form['pets_help_description'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Pets help description'),
      '#default_value' => $config->get('unl_contact.pets_help_description'),
    );
    $form['pets_help_adopt_href'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Pets help Adopt href'),
      '#default_value' => $config->get('unl_contact.pets_help_adopt_href'),
    );
    $form['pets_help_adopt_label'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Pets help Adopt label'),
      '#default_value' => $config->get('unl_contact.pets_help_adopt_label'),
    );
    $form['pets_help_donate_href'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Pets help donates href'),
      '#default_value' => $config->get('unl_contact.pets_help_donate_href'),
    );
    $form['pets_help_donate_label'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Pets help donate label'),
      '#default_value' => $config->get('unl_contact.pets_help_donate_label'),
    );
    $form['pets_see_more_description'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Pets See more description'),
      '#default_value' => $config->get('unl_contact.pets_see_more_description'),
    );
    $form['pets_see_more_href'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Pets See more href'),
      '#default_value' => $config->get('unl_contact.pets_see_more_href'),
    );
    $form['pets_see_more_label'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Pets See more label'),
      '#default_value' => $config->get('unl_contact.pets_see_more_label'),
    );
    $form['pets_more_info_href'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('More info about adoption href'),
      '#default_value' => $config->get('unl_contact.pets_more_info_href'),
    );
    $form['pets_more_info_label'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('More info about adoption label'),
      '#default_value' => $config->get('unl_contact.pets_more_info_label'),
    );
    $form['featured_dog_button_label'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('text of "Featured dog" button'),
      '#default_value' => $config->get('unl_contact.featured_dog_button_label'),
    );
    
    
    return $form;
  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->config('unl_contact.settings');
    $config->set('unl_contact.contact_phone', $form_state->getValue('contact_phone'));
    $config->set('unl_contact.contact_email', $form_state->getValue('contact_email'));
    $config->set('unl_contact.show_map', $form_state->getValue('show_map'));
    $config->set('unl_contact.pets_help_description', $form_state->getValue('pets_help_description'));
    $config->set('unl_contact.pets_help_adopt_href', $form_state->getValue('pets_help_adopt_href'));
    $config->set('unl_contact.pets_help_adopt_label', $form_state->getValue('pets_help_adopt_label'));
    $config->set('unl_contact.pets_help_donate_href', $form_state->getValue('pets_help_donate_href'));
    $config->set('unl_contact.pets_help_donate_label', $form_state->getValue('pets_help_donate_label'));
    $config->set('unl_contact.pets_see_more_description', $form_state->getValue('pets_see_more_description'));
    $config->set('unl_contact.pets_see_more_href', $form_state->getValue('pets_see_more_href'));
    $config->set('unl_contact.pets_see_more_label', $form_state->getValue('pets_see_more_label'));
    $config->set('unl_contact.pets_more_info_href', $form_state->getValue('pets_more_info_href'));
    $config->set('unl_contact.pets_more_info_label', $form_state->getValue('pets_more_info_label'));
    $config->set('unl_contact.featured_dog_button_label', $form_state->getValue('featured_dog_button_label'));
    
    $config->save();

    return parent::submitForm($form, $form_state);
  }

  /**
   * @return array
   */
  protected function getEditableConfigNames() {

    return [
      'unl_contact.settings',
    ];
  }
}
