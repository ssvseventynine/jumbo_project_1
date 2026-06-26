// Initialize the core AngularJS module matching the index.html ng-app directive
var app = angular.module('jumboApp', []);

// Main Controller handling shared data state between individual components
app.controller('JumboMainController', ['$scope', '$http', function($scope, $http) {
    $scope.products = [];
    
    // Shared core function to pull all products from our Spring Boot endpoint
    $scope.refreshInventory = function() {
        $http.get('/api/products')
            .then(function(response) {
                $scope.products = response.data;
            }, function(error) {
                console.error("Error retrieving inventory dataset:", error);
            });
    };

    // Auto-load inventory data when application context bootstraps
    $scope.refreshInventory();
}]);

// ==========================================
// COMPONENT 1: NAVBAR COMPONENT
// ==========================================
app.component('jumboNavbar', {
    template: `
        <div class="component-box" style="background: #0078d4; color: white;">
            <h2 style="margin:0;">🚀 Jumbo_Project_1: Enterprise Core Portal</h2>
            <p style="margin:5px 0 0 0; font-size:14px; opacity:0.9;">Monolithic Architecture Deployment Engine</p>
        </div>`
});

// ==========================================
// COMPONENT 2: PRODUCT REGISTRATION FORM
// ==========================================
app.component('jumboProductForm', {
    template: `
        <div class="component-box">
            <h3 style="margin-top:0; color:#0078d4;">📋 Catalog Input Component</h3>
            <form ng-submit="$ctrl.addProduct()">
                <input type="text" ng-model="$ctrl.name" placeholder="Product Name Name" required />
                <input type="number" step="0.01" ng-model="$ctrl.price" placeholder="Unit Price (USD)" required />
                <button type="submit">Add New Item</button>
            </form>
        </div>`,
    controller: ['$http', '$scope', function($http, $scope) {
        var ctrl = this;
        
        ctrl.addProduct = function() {
            var payload = {
                name: ctrl.name,
                price: ctrl.price
            };
            
            // Post payload directly to Spring Boot's ProductController API mappings
            $http.post('/api/products', payload)
                .then(function() {
                    // Trigger inventory refresh from the main application parent scope
                    $scope.$parent.refreshInventory();
                    // Clear out inputs upon successful validation save
                    ctrl.name = '';
                    ctrl.price = '';
                }, function(error) {
                    console.error("Failed to commit item payload to persistence layer:", error);
                });
        };
    }]
});

// ==========================================
// COMPONENT 3: PRODUCT INVENTORY SYSTEM LIST
// ==========================================
app.component('jumboProductList', {
    template: `
        <div class="component-box">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin:0; color:#0078d4;">📦 Live Managed Inventory</h3>
                <button ng-click="$parent.refreshInventory()">🔄 Force Sync Data</button>
            </div>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />
            <div ng-if="$parent.products.length === 0" style="color: #777; font-style: italic;">
                No inventory records detected in the persistent database cluster yet.
            </div>
            <ul>
                <li ng-repeat="product in $parent.products">
                    <strong>ID #{{product.id}}:</strong> {{product.name}} — 
                    <span style="color: #2b882b; font-weight: bold;">\${{product.price | number:2}}</span>
                </li>
            </ul>
        </div>`
});

// ==========================================
// COMPONENT 4: SYSTEM OPERATIONAL FOOTER
// ==========================================
app.component('jumboFooter', {
    template: `
        <div class="component-box" style="background: #f4f4f4; font-size: 13px; color: #555; text-align: center;">
            <div>© 2026 <strong>com.sidhant</strong> - Jumbo_Project_1 Architecture Baseline. All rights reserved.</div>
            <div style="margin-top: 5px; font-size: 11px; color: #888;">
                Backend Context Engine: OpenJDK 21 Runtime | Framework Target: Spring Boot 3 + Hibernate JPA
            </div>
        </div>`
});