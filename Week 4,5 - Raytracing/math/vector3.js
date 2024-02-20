/*
 * An "object" representing a 3d vector to make operations simple and concise.
 *
 * Similar to how we work with plain numbers, we will work with vectors as
 * an entity unto itself.  Note the syntax below: var Vector3 = function...
 * This is different than you might be used to in most programming languages.
 * Here, the function is meant to be instantiated rather than called and the
 * instantiation process IS similar to other object oriented languages => new Vector3()
 */

var Vector3 = function(x, y, z) {
    this.x = x !== undefined ? x : 0;
    this.y = y !== undefined ? y : 0;
    this.z = z !== undefined ? z : 0;
  
    // Sanity check to prevent accidentally using this as a normal function call
    if (!(this instanceof Vector3)) {
      console.error("Vector3 constructor must be called with the 'new' operator");
    }
  
  }
  
  Vector3.prototype = {
  
    //----------------------------------------------------------------------------- 
    set: function(x, y, z) {
      // todo set 'this' object's values to those from x, y, and z
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    },
  
    //----------------------------------------------------------------------------- 
    clone: function() {
      return new Vector3(this.x, this.y, this.z);
    },
  
    //----------------------------------------------------------------------------- 
    copy: function(other) {
      // copy the values from other into 'this'
      this.x = other.x;
      this.y = other.y;
      this.z = other.z;
      return this;
    },
  
    //----------------------------------------------------------------------------- 
  //-----------------------------------------------------------------------------
  negate: function() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  },
  
  
    //----------------------------------------------------------------------------- 
  //-----------------------------------------------------------------------------
  add: function(v) {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  },
  
  //-----------------------------------------------------------------------------
  subtract: function(v) {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  },
  
  //-----------------------------------------------------------------------------
  multiplyScalar: function(scalar) {
    return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
  },
  
  //-----------------------------------------------------------------------------
  length: function() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  },
  
  lengthSqr: function() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  },
  
  
  //-----------------------------------------------------------------------------
  normalize: function() {
    var len = this.length();
    // Ensure we don't divide by zero
    if (len > 0) {
      this.x /= len;
      this.y /= len;
      this.z /= len;
    }
    return this;
  },
  
  
     
  //-----------------------------------------------------------------------------
  dot: function(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  },
  
  
  
    //============================================================================= 
    // The functions below must be completed in order to receive an "A"
  
    //----------------------------------------------------------------------------- 
    fromTo: function(fromPoint, toPoint) {
      if (!(fromPoint instanceof Vector3) || !(toPoint instanceof Vector3)) {
        console.error("fromTo requires two vectors: 'from' and 'to'");
        return null;
      }
      this.x = toPoint.x - fromPoint.x;
      this.y = toPoint.y - fromPoint.y;
      this.z = toPoint.z - fromPoint.z;
      return this;
    },
  
    //----------------------------------------------------------------------------- 
    rescale: function(newScale) {
      var length = this.length();
      if (length !== 0) {
        this.x = (this.x / length) * newScale;
        this.y = (this.y / length) * newScale;
        this.z = (this.z / length) * newScale;
      }
      return this;
    },
    //----------------------------------------------------------------------------- 
    angle: function(v1, v2) {
      var dot = v1.dot(v2);
      var lengths = v1.length() * v2.length();
      if (lengths === 0) {
        return 0;
      } else {
        var cosine = dot / lengths;
        cosine = Math.max(-1, Math.min(1, cosine));
        var angleInRadians = Math.acos(cosine);
        var angleInDegrees = angleInRadians * (180 / Math.PI);
        return angleInDegrees;
      }
    },
  
    //----------------------------------------------------------------------------- 
  //-----------------------------------------------------------------------------
  project: function(vectorToProject, otherVector) {
    var dot = vectorToProject.dot(otherVector);
    var lengthSqr = otherVector.lengthSqr();
    if (lengthSqr === 0) {
      return new Vector3(0, 0, 0); 
    }
    var scalarProjection = dot / lengthSqr;
    return new Vector3(
      otherVector.x * scalarProjection,
      otherVector.y * scalarProjection,
      otherVector.z * scalarProjection
    );
  }
  }