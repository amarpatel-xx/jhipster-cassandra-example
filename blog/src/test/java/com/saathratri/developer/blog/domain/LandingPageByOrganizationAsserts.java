package com.saathratri.developer.blog.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class LandingPageByOrganizationAsserts {

    /**
     * Asserts that the entity has all properties (fields) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertLandingPageByOrganizationAllPropertiesEquals(
        LandingPageByOrganization expected,
        LandingPageByOrganization actual
    ) {
        assertLandingPageByOrganizationAutoGeneratedPropertiesEquals(expected, actual);
        assertLandingPageByOrganizationAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertLandingPageByOrganizationAllUpdatablePropertiesEquals(
        LandingPageByOrganization expected,
        LandingPageByOrganization actual
    ) {
        assertLandingPageByOrganizationUpdatableFieldsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertLandingPageByOrganizationAutoGeneratedPropertiesEquals(
        LandingPageByOrganization expected,
        LandingPageByOrganization actual
    ) {
        assertThat(expected)
            .as("Verify LandingPageByOrganization auto generated properties")
            .satisfies(e -> assertThat(e.getOrganizationId()).as("check organizationId").isEqualTo(actual.getOrganizationId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertLandingPageByOrganizationUpdatableFieldsEquals(
        LandingPageByOrganization expected,
        LandingPageByOrganization actual
    ) {
        assertThat(expected).as("Verify LandingPageByOrganization relevant properties");
    }
}
