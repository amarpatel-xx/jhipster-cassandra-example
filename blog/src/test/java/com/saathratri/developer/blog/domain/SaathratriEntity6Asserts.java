package com.saathratri.developer.blog.domain;

import static com.saathratri.developer.blog.domain.AssertUtils.bigDecimalCompareTo;
import static org.assertj.core.api.Assertions.assertThat;

public class SaathratriEntity6Asserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSaathratriEntity6AllPropertiesEquals(SaathratriEntity6 expected, SaathratriEntity6 actual) {
        assertSaathratriEntity6AutoGeneratedPropertiesEquals(expected, actual);
        assertSaathratriEntity6AllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSaathratriEntity6AllUpdatablePropertiesEquals(SaathratriEntity6 expected, SaathratriEntity6 actual) {
        assertSaathratriEntity6UpdatableFieldsEquals(expected, actual);
        assertSaathratriEntity6UpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSaathratriEntity6AutoGeneratedPropertiesEquals(SaathratriEntity6 expected, SaathratriEntity6 actual) {
        assertThat(expected)
            .as("Verify SaathratriEntity6 auto generated properties")
            .satisfies(e -> assertThat(e.getOrganizationId()).as("check organizationId").isEqualTo(actual.getOrganizationId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSaathratriEntity6UpdatableFieldsEquals(SaathratriEntity6 expected, SaathratriEntity6 actual) {
        assertThat(expected)
            .as("Verify SaathratriEntity6 relevant properties")
            .satisfies(e -> assertThat(e.getArrivalDate()).as("check arrivalDate").isEqualTo(actual.getArrivalDate()))
            .satisfies(e -> assertThat(e.getAccountNumber()).as("check accountNumber").isEqualTo(actual.getAccountNumber()))
            .satisfies(e -> assertThat(e.getCreatedTimeId()).as("check createdTimeId").isEqualTo(actual.getCreatedTimeId()))
            .satisfies(e -> assertThat(e.getDepartureDate()).as("check departureDate").isEqualTo(actual.getDepartureDate()))
            .satisfies(e -> assertThat(e.getCustomerId()).as("check customerId").isEqualTo(actual.getCustomerId()))
            .satisfies(e -> assertThat(e.getCustomerFirstName()).as("check customerFirstName").isEqualTo(actual.getCustomerFirstName()))
            .satisfies(e -> assertThat(e.getCustomerLastName()).as("check customerLastName").isEqualTo(actual.getCustomerLastName()))
            .satisfies(e ->
                assertThat(e.getCustomerUpdatedEmail()).as("check customerUpdatedEmail").isEqualTo(actual.getCustomerUpdatedEmail())
            )
            .satisfies(e ->
                assertThat(e.getCustomerUpdatedPhoneNumber())
                    .as("check customerUpdatedPhoneNumber")
                    .isEqualTo(actual.getCustomerUpdatedPhoneNumber())
            )
            .satisfies(e ->
                assertThat(e.getCustomerEstimatedArrivalTime())
                    .as("check customerEstimatedArrivalTime")
                    .isEqualTo(actual.getCustomerEstimatedArrivalTime())
            )
            .satisfies(e -> assertThat(e.getTinyUrlShortCode()).as("check tinyUrlShortCode").isEqualTo(actual.getTinyUrlShortCode()))
            .satisfies(e -> assertThat(e.getAddOnDetailsText()).as("check addOnDetailsText").isEqualTo(actual.getAddOnDetailsText()))
            .satisfies(e ->
                assertThat(e.getAddOnDetailsDecimal())
                    .as("check addOnDetailsDecimal")
                    .usingComparator(bigDecimalCompareTo)
                    .isEqualTo(actual.getAddOnDetailsDecimal())
            )
            .satisfies(e ->
                assertThat(e.getAddOnDetailsBoolean()).as("check addOnDetailsBoolean").isEqualTo(actual.getAddOnDetailsBoolean())
            )
            .satisfies(e -> assertThat(e.getAddOnDetailsBigInt()).as("check addOnDetailsBigInt").isEqualTo(actual.getAddOnDetailsBigInt()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSaathratriEntity6UpdatableRelationshipsEquals(SaathratriEntity6 expected, SaathratriEntity6 actual) {
        // empty method
    }
}
