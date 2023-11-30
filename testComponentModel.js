"use strict";

use(["/libs/wcm/foundation/components/utils/ResourceUtils.js"], function (ResourceUtils) {
    var options = [];

    // Get the dialog resource
    var dialogResource = ResourceUtils.getContainingPage(resource).getContentResource("myComponent");

    if (dialogResource) {
        // Get values from the multifield
        options = dialogResource.getChildren().map(function (item) {
            var name = item.getValueMap().get("name", "");
            var value = item.getValueMap().get("value", "");
            return { name: name, value: value };
        });
    }

    return {
        options: options
    };
});
