![da_header](https://gist.github.com/assets/104391124/c3930783-a061-4448-b4f0-9acb2eee15eb)
# DESIGN DOCUMENT: The bridges from the pathchain to the user interface 

### *🐬 MySQL* [*`⛁ relational database`*](jiji) connection to the [*`🖇 pathchain`*](https://www.npmjs.com/package/pathchain)

This design document explains the relational database structure on how the pathchain is connected to the user interface features. It is very helpful to look at in order to understand the recursive properties of the tracking nature of pathos.cloud.

This is the seed for the primal feature of [*`☁ pathos.cloud`*](http://pathos.cloud/#/) that is a [user](#user) [post](#post)ing a [path](#path).

## Important stablishments
> [*`☁ pathos.cloud`*](http://pathos.cloud/#/) ::= It is a tool to build paths of data and knowledge that are cryptographically secured by being tied into healthy backtracking-able origin chains. This tool is currently a web application where path-crafting is done manually.
> 
> [*`⛁ relational database`*](jiji) ::= [*`⛁ RDB`*](jiji) ::= 🐬 MySQL relational database that stores the pointers to the [*`🖇 pathchain`*](https://www.npmjs.com/package/pathchain) hashes and holds a minimalistic table infrastructure to manage the login and posting features for the user interface.
> 
> [*`🖇 pathchain`*](https://www.npmjs.com/package/pathchain) ::= The pathchain is the abstract representation of the digital trees of knowledge on [*`☁ pathos.cloud`*](http://pathos.cloud/#/).

---
## The tables of the [*`⛁ RDB`*](jiji)
This a representation on how the active entites on the system relate to each other (an entity-relationship model of the RDB).
> ![er](https://gist.github.com/assets/104391124/f1944f95-9209-4ccd-a907-ea710cb2e92a)
>
>  The active tables' references: [entity 👾](#entity), [user 👤](#user), [node](#node), [path](#path), [label](#label), [link](#link), [skeleton](#skeleton), [post](#post), [action 🕹️](#action).


---
# [*`☁ pathos.cloud`*](http://pathos.cloud/#/) API REST TABLE DOCUMENTATION:



## entity 👾
Entities are the ones who post on pathos.cloud. They can be human users, human user extensions, organizations of humans or bots

SQL definition:
```SQL
  `id` varchar(64) NOT NULL,
  `ancestor_id` varchar(64) NOT NULL,
  `secret_id` varchar(64) NOT NULL,
  `type_id` varchar(64) NOT NULL
```

Relationships
> The [entity.ancestor_id](#entity) field `requires` an existing [entity](#entity) record.
>
> The [entity.type_id](#entity_type) field `requires` an existing [entity type](#entity_type) record.
> 
> The [entity.secret_id](#secret) field `requires` an existing [secret](#secret) record.


### entity_type
This is a [Type seeder](#type) table that serves as a catalogue for entity types
> **Types:** USER, BOT, ORGANIZATION, COMMUNITY



## secret 🔑
Secrets are hashes that represent unique tokens to perform actions at several layers on the pathchain.

SQL Definition
```SQL
  `id` varchar(64) NOT NULL,
  `owner_id` varchar(64) NOT NULL,
  `password` varchar(255),
  `receiver_id` varchar(64),
  `type_id` INT NOT NULL,
  `used` varchar(64)
```

Relationships
> The [secret.owner_id](#entity) field `requires` an existing [entity](#entity) record.
>
> The [secret.receiver_id](#entity) field `requires` an existing [entity](#entity) record.
> 
> The [secret.type_id](#secret) field `requires` an existing [secret](#secret_type) record.


### secret_type
This is a [Type seeder](#type) table that serves as a catalogue for entity types
> **Types:** INVITE_SECRET, TOKEN

 
## user 👤
The user tables keep the record to manage the login process while taking care of the integrity of the user related to the entity chain on the patchain.

SQL Definition
```SQL
`id` varchar(64) NOT NULL,
`entity_id` varchar(64) NOT NULL,
`login` varchar(255) NOT NULL,
`password` varchar(255) NOT NULL,
`username` varchar(255) NOT NULL
```

Relationships
> The [user.entity_id](#entity) field `requires` an existing [entity](#entity) record.



## node
Nodes are the prime elements of paths.

> Node representation
>
> ![node](https://gist.github.com/assets/104391124/b6dcd2ad-2461-4429-a994-c91b8db4b717)

SQL definition:
```SQL
  `id` varchar(64) NOT NULL,
  `ancestor_id` varchar(64) NOT NULL,
  `owner_id` varchar(64) NOT NULL
```

Relationships:
> The [node.ancestor_id](#node) field `requires` a existing [node](#node) record.
> 
> The [node.owner_id](#entity) field `requires` an existing [entity](#entity) record.


## label
Labels are the classification elements of the pathchain.

> Single label representation
>
> ![label](https://gist.github.com/assets/104391124/76796667-b8de-43a9-b197-9dbfd7601c62) 

Labels can classify each other recursively. This feature allows a multi-dimensional classification structure for paths. Label relevance depends on context and how users rank them.

> Nested label representation
> 
> ![nested_label](https://gist.github.com/assets/104391124/8b189e3e-aadd-4790-b53a-e9423abded57)

SQL definition:
```SQL
  `id` varchar(64) NOT NULL,
  `ancestor_id` varchar(64) NOT NULL,
  `name` varchar(255) DEFAULT '',
  `owner_id` varchar(64) NOT NULL
```

Relationships:
> The [label.ancestor](#node) field `requires` an exisging [label](#label) record.
> 
> The [label.owner](#entity) field `requires` an existing [entity](#entity) record.


## path

> Linear path representation
>
> The first node with the red dot is the head of the path
>
> ![path](https://gist.github.com/assets/104391124/297e3485-3c79-4980-86d7-9093884f05ea)

SQL definition:
```SQL
  `id` varchar(64) NOT NULL,
  `ancestor_id` varchar(64) NOT NULL,
  `head_id` varchar(64) NOT NULL,
  `owner_id` varchar(64) NOT NULL
```

Relationships:
> The [path.ancestor_id](#ancestor) field `requires` an existing [path](#path) record.
> 
> The [path.head_id](#head) field `requires` an existing [link](#link) record.
> 
> The [path.owner_id](#entity) field `requires` an existing [entity](#entity) record.



## The links
Links are the representation of all the bonds inside the pathchain. The pathchain can be described as a tree with labels.

The tree is just a path of bonded paths. Paths come from bonded nodes that can be bonded to paths and paths of bonded paths.

All links look the same in SQL structure:
```SQL
  `id` varchar(64) NOT NULL,
  `next_id` varchar(64) NOT NULL,
  `prev_id` varchar(64) NOT NULL,
  `target_id` varchar(64) NOT NULL,
  `type_id` varchar(64) NOT NULL
```

Relationships:
> The [link.next_id](#link) field `requires` a [link](#link). When the link is the last element of a [path](#path), [link.next_id](#link) should point to the [link.id](#link) itself.
> 
> The [link.prev_id](#link) field `requires` a [link](#link). When the link is the head of a [path](#path), [link.prev_id](#link) should point to the [link.id](#link) itself.
> 
> The [link.target_id](#node) field `requires` a [path](#path), [node](#node) or [label](#label) field.



## The links limits
This is how paths of any dimension can be built through link connections using the links

> [node](#node) ➡ [node](#node) link representation
>
> ![node__node](https://gist.github.com/assets/104391124/2ef35b37-8d4d-4886-8608-a377a432f1b9)


> [node](#node) ➡ [path](#node) link representation
>
> ![node__path](https://gist.github.com/assets/104391124/fa9e14c3-c666-4f05-b42c-c76d0bed52a0)


> [node](#node) ➡ [path of paths](#path) link representation
>
> ![node__path_of_paths](https://gist.github.com/assets/104391124/8a25c2db-ad7f-47b7-b15d-7cc4cb0242f1)


> [node](#node) ➡ [path of paths of paths](#path) link representation
>
> ![node__monster](https://gist.github.com/assets/104391124/0edb6be4-e79b-4523-8516-59109af0c369)



> [path](#path) ➡ [path](#path) link representation
>
> ![path__path](https://gist.github.com/assets/104391124/2b129411-c9a0-4297-b915-1072fdaa11fa)


> [path of paths](#path) ➡ [path of paths](#path) link representation
>
> ![monster__path](https://gist.github.com/assets/104391124/25575dd2-637a-47e5-9a17-4bf54f70c175)


## Labels
> [label](#label) ➡ [label](#label) link representation
>
> ![label__label](https://gist.github.com/assets/104391124/1c7993c4-8563-45f5-93f0-11daaf22adde)


> [label](#label) ➡ [node](#node) link representation
>
> ![label__node](https://gist.github.com/assets/104391124/526627c4-e6dd-4477-afde-d955c6957e66)


> [label](#label) ➡ [path](#path) link representation
>
> ![label__path](https://gist.github.com/assets/104391124/193b6e8a-f709-4baf-b666-8c66934ff034)


> [label](#label) ➡ [path of paths](#path) link representation
>
> ![label__monster](https://gist.github.com/assets/104391124/f9bc95c3-3b51-46ea-b5e2-821ece834bcf)


## skeleton
Skeletons are a pair of paths, one of labels and another one of nodes and paths. Skeletons are dictionaries of data structures where the labels define the meaning for who are using them.

> Skeleton representation
>
>![skeleton](https://gist.github.com/assets/104391124/7c84b6ef-3076-4125-9875-091168f97f30)


SQL definition:
```SQL
  `id` varchar(64) NOT NULL,
  `ancestor_id` varchar(64) NOT NULL,
  `name` varchar(255) DEFAULT '',
  `keys_head_id` varchar(64) NOT NULL,
  `vals_head_id` varchar(64) NOT NULL,
  `owner_id` varchar(64) NOT NULL
```

Relationships:
> The [skeleton.ancestor_id](#ancestor) field `requires` an existing [skeleton](#skeleton) record.
> 
> The [skeleton.keys_head_id](#head) field `requires` an existing [path](#path) record.
>
> The [skeleton.keys_vals_id](#head) field `requires` an existing [path](#path) record.
> 
> The [skeleton.owner_id](#entity) field `requires` an existing [entity](#entity) record.


## post
Posts are elements that hold nodes and paths. They are posted by entities and they allow other users to interact with them and also branch or mirror content into new connected posts coming from them.

SQL definition:
```SQL
  `id` varchar(64) NOT NULL,
  `ancestor_id` varchar(64) NOT NULL,
  `target_id` varchar(64) NOT NULL,
  `title` varchar(255) DEFAULT '',
  `owner_id` varchar(64) NOT NULL
```

Relationships:
> The [post.ancestor_id](#post) field `requires` an existing [post](#post) record.
> 
> The [post.target_id](#path) field `requires` an existing [link](#link) or [node](#node) record.
> 
> The [path.owner_id](#entity) field `requires` an existing [entity](#entity) record.


### action 🕹️
Actions are performed by entities in relationships with posts. They could be understood better by assuming the preffix "to" to them  in relationship with a post c:

SQL Definition
```SQL
  `id` varchar(64) NOT NULL,
  `message` varchar(255) DEFAULT '',
  `moment` varchar(255) DEFAULT '',
  `owner_id` varchar(64) NOT NULL,
  `post_id` varchar(64) NOT NULL,
  `type_id` INT NOT NULL
```

Relationships
> The [action.owner_id](#entity) field `requires` an existing [entity](#entity) record.
>
> The [action.post_id](#post) field `requires` an existing [post](#post) record.
> 
> The [action.type_id](#type) field `requires` an existing [action type](#action_type) record.


#### action_type
This is a [Type seeder](#type) table that serves as a catalogue for entity types
> **Types:**  SHARE, HOLD, OWN, CREATE, INTERACT, CONNECT, LABEL


### connection 🔌
A connection connects one post with another

SQL Definition
```SQL
  `id` varchar(64) NOT NULL,
  `action_id` varchar(64) NOT NULL,
  `message` varchar(255) DEFAULT '',
  `post_id` varchar(64) NOT NULL,
  `type_id` INT NOT NULL
```

Relationships
> The [connection.action_id](#action) field `requires` an existing [action](#action) record.
>
> The [connection.post_id](#post) field `requires` an existing [post](#post) record.
> 
> The [connection.type_id](#type) field `requires` an existing [connection type](#connection_type) record.


#### connection_type
This is a [Type seeder](#type) table that serves as a catalogue for entity types
> **Types:** CONNECTION, REFLECTION, MUTATION


### interaction ⏫
Measurable things user do with posts

SQL Definition
```SQL
  `id` varchar(64) NOT NULL,
  `action_id` varchar(64) NOT NULL,
  `message` varchar(255) DEFAULT '',
  `references_id` varchar(64),
  `type_id` INT NOT NULL,
  `value` varchar(255) DEFAULT ''
```

Relationships
> The [interaction.action_id](#action) field `requires` an existing [action](#action) record.
>
> The [interaction.references_id](#skeleton) field `requires` an existing [skeleton](#skeleton) record.
> 
> The [interaction.type_id](#type) field `requires` an existing [interaction type](#interaction_type) record.


#### interaction_type
This is a [Type seeder](#type) table that serves as a catalogue for entity types
> **Types:** COMMENT, VOTE_UP, VOTE_DOWN, ⚡


## type
### The type tables & their seeders
These tables contain the minimum expression to represent the "do-able" things in pathos.cloud. They're the minimum catalog of types for the system to operate with a login and a posting platform behaviour. The seeders are pretty self-explaining for the kind of information that they're supposed to label. Altough the labels do exist in pathos.cloud, this is an attempt to cut down a lot of redundancies that will cause a lot of problems.

All of the following tables share the following structure described in SQL:
```SQL
`id` integer(64) NOT NULL,
`name` varchar(64) NOT NULL
```

---
APPENDIX: CLASS DIAGRAM & RDB

> UML CLASS DIAGRAM 
> ![UML_TEXTURIZED](https://gist.github.com/assets/104391124/cc5608e4-52ba-49e9-9047-3145a6c8968b)
---

# Public Endpoints

#### Endpoint
`http://pathos.cloud/secrets/pioneer/`

#### Response
```shell
{
    "message": "GET PIONEER SECRET",
    "pioneer": {
        "birthday": "moments/18fe44feca315e346964887a21364f71943153cb76b66a0aebf9b1d02cdc736f",
        "register": "moments/bb37cc06cdaf8f393bfbe18db68a7f95d04d6ed9edeaddfc85db8ac8cf39873c",
        "invite": "users/cad25e0c5864e597fdf45ea13a3a11ce8e46ddaee060de91d2a82e8e649d0cb4",
        "tag": "users/cad25e0c5864e597fdf45ea13a3a11ce8e46ddaee060de91d2a82e8e649d0cb4"
    },
    "results": {
        "register": "moments/7d4d3131fcd20e606090d91f3bdc0d4831798e6af24001ee25dcac8a6426a50c",
        "author": "pioneer/cad25e0c5864e597fdf45ea13a3a11ce8e46ddaee060de91d2a82e8e649d0cb4",
        "used": false,
        "tag": "secrets/4acda9de3b4720ecf504f7661f2ce47180226af4380a40507eea0e2a37012ed0"
    }
}
```


# Login Endpoints
