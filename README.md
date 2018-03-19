# Brigade Hello World

A Hello World Brigade project intended to test the [Brigade GCR Gateway](https://github.com/danillouz/brigade-gcr-gateway/).

## Creating a Brigade Project

These instructions assume Brigade is already running on a k8s cluster, see the [install guide](https://github.com/Azure/brigade/blob/master/docs/topics/install.md)
for more information.
Note that it's _recommended_ to isolate brigade in it's own namespace and _enable
RBAC_, see the [security guide](https://github.com/Azure/brigade/blob/master/docs/topics/security.md)
for more information.

First generate a `values.yaml` which holds the project config (don't commit this file):

```
$ helm repo add brigade https://azure.github.io/brigade

$ helm inspect values brigade/brigade-project > values.yaml
```

Modify at least these fields in the `values.yaml`:

```yaml
project: "danillouz/brigade-hello-world"
repository: "https://github.com/danillouz/brigade-hello-world"
cloneURL: "https://github.com/danillouz/brigade-hello-world.git"
sharedSecret: "SOME_SECRET"
```

## Installing a Brigade Project

_It's recommended that Brigade is installed in it's own namespace, see the [Brigade Security Guide](https://github.com/Azure/brigade/blob/master/docs/topics/security.md) for more information._

```
$ helm install brigade/brigade-project --namespace brigade -n brigade-hello-world -f values.yaml
```

Check the status of the project by running:

```
$ helm status brigade-hello-world
```

A Brigade project can be updated after changing fields in `values.yaml` by running:

```
$ helm upgrade brigade-hello-world brigade/brigade-project -f values.yaml --namespace brigade
```

And deleted by running:

```
$ helm delete brigade-hello-world
```

## Using the Brigade Client

At the moment there're no prebuilt binaries for `brig`, follow the [developer guide](https://github.com/Azure/brigade/blob/master/docs/topics/developers.md)
to install `brig`.

The `brigade.js` script can be run manually with the following command:

```
$ brig run -f ./brigade.js danillouz/brigade-hello-world
```

This will output something like:

```
Started build 01c8fsqq61pesmdeby48evvhj2 as "brigade-worker-01c8fsqq61pesmdeby48evvhj2"
prestart: src/brigade.js written

[brigade] brigade-worker version: 0.11.0
[brigade:k8s] Creating PVC named brigade-worker-01c8fsqq61pesmdeby48evvhj2
[brigade:app] after: default event fired
[brigade:app] beforeExit(2): destroying storage
[brigade:k8s] Destroying PVC named brigade-worker-01c8fsqq61pesmdeby48evvhj2
```

Where `brigade-worker-01c8fsqq61pesmdeby48evvhj2` is the name of the k8s pod.
