# Instructions for managing content on the home site via CMS Strapi

## Content:
1. [General Information](#general-information)<br/>
    1.1. [Draft and Published Version of Content](#draft-and-published)<br/>
    1.2. [Filling in Content in Different Languages](#different-languages)<br/>
2. [Existing Components](#existing-components)
3. [Navigation](#navigation)<br/>
    3.1. [Location of Navigation Tab](#location-navigation-tab)<br/>
    3.2. [Creating Single-Level Navigation](#create-single-level-navigation)<br/>
    3.3. [Creating Multi-Level Navigation](#create-multi-level-navigation)<br/>
    3.4. [Adding Navigation to Header](#add-navigation-to-header)<br/>
    3.5. [Adding Navigation to Footer](#add-navigation-to-footer)<br/>
4. [Social Networks](#social-networks)<br/>
    4.1. [Location of Social Networks Tab](#location-social-networks-tab)<br/>
    4.2. [Creating Social Networks](#create-social-networks)<br/>
    4.3. [Adding Social Networks to Header](#add-social-networks-to-header)<br/>
    4.4. [Adding Social Networks to Footer](#add-social-networks-to-footer)<br/>
5. [Homepage](#homepage)<br/>
    5.1. [Location of Homepage Tab](#location-homepage-tab)<br/>
    5.2. [Filling in Homepage](#filling-in-the-homepage)<br/>
6. [Layout](#layout)<br/>
    6.1. [Location of Layout Tab](#location-layout-tab)<br/>
    6.2. [Filling in Layout](#filling-in-the-layout)<br/>
7. [Adding New Pages](#adding-new-pages)

<h2 id="general-information">1. General Information</h2>

<h3 id="draft-and-published">1.1. Draft and Published Version of Content</h3>
All content in the CMS has a draft version and a published version.

- Published version is visible to everyone.
- Draft version can be viewed in the CMS or in the preview mode.

You can switch between them.

![alt text](./images/draft-and-published-version.png)

To view the content in a draft mode without publishing it, you need to click on the "Save" button, and then "Open draft preview".

![alt text](./images/preview-mode.png)

<h3 id="different-languages">1.2. Filling in Content in Different Languages</h3>

All CMS content can be filled in different languages, and you can select the language using the language switch.

![alt text](./images/language-switch.png)

To fill in content in different languages, fill in the content in one language first, save it, and then switch to another language.

If you want to transfer all the content from another language so as not to fill everything in from scratch, click on the button next to the language switch.

![alt text](./images/transferring-content-from-another-language-1.png)

In the window that opens, select the language you want to copy the content from and confirm your choice.

![alt text](./images/transferring-content-from-another-language-2.png)

<h2 id="existing-components">2. Existing Components</h2>

1. [Hero](https://www.tourmalinecore.com/components/hero)

2. [FeaturedCardList](https://tourmalinecore.com/components/featured-cards-list)

3. [CollageWithTitle](https://www.tourmalinecore.com/components/collage-with-title)

4. [CollageWithLink](https://www.tourmalinecore.com/components/collage-with-link)

5. [SignpostMultiple](https://www.tourmalinecore.com/components/signpost-multiple)

6. [SingleImage](https://www.tourmalinecore.com/components/single-image)

7. ShowCasesGrid:</br>
  7.1. [With markdown columns](https://tourmalinecore.com/components/showcase-grid-with-markdown-column)</br> 
  7.2. [Three columns](https://tourmalinecore.com/components/showcase-grid-with-three-columns)</br>
  7.3. [Four columns](https://tourmalinecore.com/components/showcase-grid-with-four-columns)

8. [ThreeColumnGrid](https://tourmalinecore.com/components/three-column-grid)

9. [Form](https://www.tourmalinecore.com/components/form-block)

<h2 id="navigation">3. Navigation</h2>

<h3 id="location-navigation-tab">3.1. Location of Navigation Tab</h3>

To get to the Navigation tab, you need to go to the Content Manager tab first.

![alt text](./images/content-manager-tab.png)

Then go to the Navigation tab.

![alt text](./images/navigation-tab.png)

<h3 id="create-single-level-navigation">3.2. Creating Single-Level Navigation</h3>

To create a single-level navigation, click the *"Create new entry"* button in the Navigation tab.

![alt text](./images/navigation-create-new-entry-btn.png)

To create a single-level navigation, fill in the `name` and `link` field and set **false** in `isMultiLevelNavigation`.

Then click on the *"Publish"* button.

![alt text](./images/creating-single-level-navigation.png)

<h3 id="create-multi-level-navigation">3.3. Creating Multi-Level Navigation</h3>

To create a multi-level navigation, click the *"Create new entry"* button in the Navigation section.

![alt text](./images/navigation-create-new-entry-btn.png)

![alt text](./images/creating-multi-level-navigation.png)

To create a multi-level navigation, fill in the `name`, set **true** in `isMultiLevelNavigation` and select the navigation that you want to attach in `navItems` field.

Then click on the *"Publish"* button.

>You can only attach a single-level navigation in `navItems`. Attaching a multi-level one will not work here.

<h3 id="add-navigation-to-header">3.4. Adding Navigation to Header</h3> 

To see the added navigation in the website header, go to the **Layout** tab and add the desired navigation in the `navigationLists` header field.

Then click on the *"Publish"* button.

![alt text](./images/adding-navigation-to-header.png)

<h3 id="add-navigation-to-footer">3.5. Adding Navigation to Footer</h3>

To see the added navigation in the website footer, go to the **Layout** tab and do the following:

1. Add a section with the navigation in `navigationLists`.
2. Fill `caption` and set **false** in `isSocialNetworks` field.
3. Add the desired navigation in the `links`.

![alt text](./images/adding-navigation-to-footer.png)

<h2 id="social-networks">4. Social Networks</h2>

<h3 id="location-social-networks-tab">4.1. Location of Social Networks Tab</h3>

To get to the Social networks tab, you need to go to the Content Manager tab first.

![alt text](./images/content-manager-tab.png)

Then go to the Social networks tab.

![alt text](./images/social-networks-tab.png)

<h3 id="create-social-networks">4.2. Creating Social Networks</h3>

To create a social network item, click the *"Create new entry"* button in the Social networks tab.

![alt text](./images/social-networks-create-new-entry-btn.png)

To create a social network item, fill in the fields `name` and `link`.

Then click on the *"Publish"* button.

![alt text](./images/creating-social-networks.png)

<h3 id="add-social-networks-to-header">4.3. Adding Social Networks to Header</h3> 

To see the added social networks in the website header, go to the **Layout** tab and add the desired social networks in the `socialLinks` header field.

Then click on the *"Publish"* button.

![alt text](./images/adding-social-networks-to-header.png)

<h3 id="add-social-networks-to-footer">4.4. Adding Social Networks to Footer</h3>

To see the added social networks in the website footer, go to the **Layout** tab and do the following:

1. Add a section with the navigation in `navigationLists`.
2. Fill `caption` and set **true** in `isSocialNetworks` field.
3. Add the desired social networks in the `socialLinks`.

![alt text](./images/adding-social-networks-to-footer.png)

<h2 id="homepage">5. Homepage</h2>

<h3 id="location-homepage-tab">5.1. Location of Homepage Tab</h3>

To get to the Homepage tab, you need to go to the Content Manager tab first.

![alt text](./images/content-manager-tab.png)

Then go to the Homepage tab.

![alt text](./images/homepage-tab.png)

<h3 id="filling-in-the-homepage">5.2. Filling in Homepage</h3>

You can add components to the homepage by clicking on the *"Add a component to blocks"* button.

![alt text](./images/homepage-add-component-btn.png)

After that, you will see all the possible components, which can be added in any order and in any quantity.

See how the components look like [here](#existing-components).

![alt text](./images/homepage-all-components.png)

To publish a page, you need to fill out the SEO, so that the page is indexed well by search engines.

![alt text](./images/homepage-seo.png)

<h2 id="layout">6. Layout</h2>

<h3 id="location-layout-tab">6.1. Location of Layout Tab</h3>

To get to the Layout tab, you need to go to the Content Manager tab first.

![alt text](./images/content-manager-tab.png)

Then go to the Layout tab.

![alt text](./images/layout-tab.png)

<h3 id="filling-in-the-layout">6.2. Filling in Layout</h3>

Layout contains a header and footer content.

The header has the fields `navigationLists` and `socialLinks`, they contain an entry from the [navigation](#navigation) and [social networks](#social-networks) section.

![alt text](./images/header-navigation-and-social-networks.png)

The footer in `navigationLists` has the fields `link` and `socialLinks`, they contain an entry from the [navigation](#navigation) and [social networks](#social-networks) section.

![alt text](./images/footer-links.png)

![alt text](./images/footer-social-links.png)

After filling in all the necessary fields, you can click *"Publish"*.

<h2 id="adding-new-pages">7. Adding New Pages</h2>

New pages are added in the Navigation tab.

![alt text](./images/navigation-tab.png)

To create a new page, click the *"Create new entry"* button in the Navigation tab.

![alt text](./images/navigation-create-new-entry-btn.png)

Fill in the `name` and `link` field and set **false** in `isMultiLevelNavigation`.

![alt text](./images/create-new-page.png)

Add the necessary components to the page and fill them in.

![alt text](./images/new-page-add-components-btn.png)

![alt text](./images/new-page-components.png)

>Make sure to fill out the SEO.

![alt text](./images/new-page-seo.png)

Then you can click on the *"Publish"* button.

See how to add a new page to the header [here](#add-navigation-to-header).

See how to add a new page to the footer [here](#add-navigation-to-footer).
