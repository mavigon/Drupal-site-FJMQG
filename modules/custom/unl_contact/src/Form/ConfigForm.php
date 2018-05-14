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
