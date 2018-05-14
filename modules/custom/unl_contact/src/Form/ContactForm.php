<?php

/**
 * @file
 * Contains \Drupal\unl_contact\Form\ContactForm.
 *
 */

namespace Drupal\unl_contact\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class ContactForm
 *
 * @package Drupal\unl_contact\Form
 */
class ContactForm extends FormBase {

  /**
   * @return string
   */
  public function getFormId() {
    return UNL_CONTACT_FORM_ID;
  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @return array
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $form['#attributes'] = array('class' => 'contact-us-form');

    $form['title'] = [
      '#markup' => "<h2>" . t("Contact us") . "</h2>",
    ];

    $form['name'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Name'),
      '#required' => TRUE,
      '#attributes' => [
        'class' => 'form-item',
      ],
    );

    $form['contact_phone'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Phone'),
      '#required' => TRUE,
      '#attributes' => [
        'class' => 'form-item',
      ],
    );

    $form['contact_email'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Email'),
      '#required' => TRUE,
      '#attributes' => [
        'class' => 'form-item',
      ],
    );

    $form['message'] = array(
      '#type' => 'textarea',
      '#title' => $this->t('Message'),
      '#attributes' => [
        'class' => 'form-item',
      ],
    );

    $form['term_info'] = [
      '#markup' => "<p class=\"term-info\">" . t('By clicking Send you accept our terms and conditions') . "</p>",
    ];

    $form['submit'] = array(
      '#type' => 'submit',
      '#attributes' => [
        'class' => ['btn'],
      ],
    );

    return $form;
  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    $email = $form_state->getValue('contact_email');
    $text_message = $form_state->getValue('message');

    $mailManager = \Drupal::service('plugin.manager.mail');
    $module = 'unl_contact';
    $key = 'unl_contact';
    $params['title'] = 'New message';
    $langcode = \Drupal::currentUser()->getPreferredLangcode();
    $send = true;

    $params['message'] = $text_message;
    $params['contact_email'] = $email;

    $to = \Drupal::config('system.site')->get('mail');
    if(!empty(\Drupal::config('unl_contact.settings')->get('unl_contact.contact_phone'))) {
      $to = \Drupal::config('unl_contact.settings')->get('unl_contact.contact_phone');
    }

    $result = $mailManager->mail($module, $key, $to, $langcode, $params, NULL, $send);
    if ($result['result'] != true) {
      $message = t('There was a problem sending your email notification to @email.', array('@email' => $to));
      drupal_set_message($message, 'error');
      \Drupal::logger('mail-log')->error($message);
      return;
    }

  }
}
