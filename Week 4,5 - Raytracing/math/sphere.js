/*
 * An object type representing an implicit sphere.
 *
 * @param center A Vector3 object representing the position of the center of the sphere
 * @param radius A Number representing the radius of the sphere.
 * 
 * Example usage:
 * var mySphere = new Sphere(new Vector3(1, 2, 3), 4.23);
 * var myRay = new Ray(new Vector3(0, 1, -10), new Vector3(0, 1, 0));
 * var result = mySphere.raycast(myRay);
 * 
 * if (result.hit) {
 *   console.log("Got a valid intersection!");
 * }
 */

var Sphere = function(center, radius) {
  if (!(this instanceof Sphere)) {
    console.error("sphere constructor not called");
    return;
  }

  this.center = center instanceof Vector3 ? center : new Vector3(0, 0, 0);
  this.radius = typeof radius === 'number' ? radius : 1;

  if (!(this.center instanceof Vector3)) {
    console.error("sphere center isnt Vector3");
  }


};

Sphere.prototype.raycast = function(ray) {
  var oc = ray.origin.subtract(this.center); 
  var a = ray.direction.dot(ray.direction);
  var b = 2.0 * oc.dot(ray.direction);
  var c = oc.dot(oc) - this.radius * this.radius;
  var discriminant = b * b - 4 * a * c;

  if (discriminant < 0) {
    return { hit: false, point: null, normal: null, distance: null };
  } else {
    var t = (-b - Math.sqrt(discriminant)) / (2 * a);
    if (t < 0) {
      return { hit: false, point: null, normal: null, distance: null };
    }

    var point = ray.origin.add(ray.direction.multiplyScalar(t));
    var normal = point.subtract(this.center).normalize();
    return { hit: true, point: point, normal: normal, distance: t };
  }
};


