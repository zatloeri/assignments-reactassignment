# Erik Zatloukal implementation notes

* I started to implement the functionality with the server in mind
  * I did not implement local ItemList changes handling first
  * I figured too late that it was probably meant to work offline first so to
save time I continued with server first implementation and added offline later
* Since there was nothing about tests in the assignment description and due to
the size and intended usage of the application (+time restrictions) I did not
write any tests to save time
  * I would have used Storybook interactions to test on this app probably

# Datamole's React / TypeScript assignment

Please, read following instructions and let us know if anything is not clear.

## General rules and requirements

* Use any npm package you find appropriate.
* Ask questions when in doubt what we expect.
* When you are not able to solve something in reasonable amount of time, write an explanation of why
  (what knowledge is missing, why it needs so much time, etc.), and skip it.
* Follow all code quality principles you know and are used to.
* You should not spend with our assignment more than 6 hours.
  When this is not doable, choose what to implement and what not to.
* Send us your work preferably as a link to git repository (e.g. GitHub).

## Time estimation
* First read the assigment, check the provided code, and make clear you understand what we ask for.
* Try to estimate the time you require to finish it.
* Email us your estimation and a date, where you expect the work to be done.
  Aim for realistic date and keep in mind all other responsibilities you may have
  (your current work, family duties, vacation or public holidays)

## The actual work

### Client app
More information about client are in `client/README.md`. Make sure you read them.

Using provided UI components, implement following modifications, bugfixes or new features (you can decide in what order):

- [x] **B1**: Fix all bugs and visual imperfections you find
- [x] **B2**: Fix layout of non-empty `List` component
- [x] **B3**: Fix Layout component so the `Footer` is always attached to its bottom
- [x] **UI1**: Style `Header` so the button is aligned on the right
- [x] **UI2**: Style `ListItem` so action buttons are aligned on the right
- [x] **UI3**: Style `ListItem` so the action buttons are only visible when hovering over the item
- [x] **F1**: Modify `Footer` to show 0 when no value(s) were passed
- [x] **F2**: After button in header is clicked, show `Form` component in the `Header` instead of the clicked button. If the Form is submitted, a new list should be saved on backend and list of all items updated
- [x] **F3**: When edit button on todo item is clicked, the row should be replaced by the `Form` component (same as for creating new todo item)
- [x] **F4**: Load items from API
   1) Implement removing todo item
   1) Implement saving "checked" state of a todo item when changed
   1) Persist all changes, additions and removals of todo items on server using API calls
- [x] **F5**: Sort list of todo items so the _done_ (=checked) items are on the bottom; next sort items by creating date, descending
- [x] **F6**: Show number of todo/done items in `Footer`
- [x] **F7**: Create a `Button` component and use it instead of all `button` html elements
- [x] **SB1**: Add story/stories for `Layout` component
- [x] **SB2**: Add story showing `ListItem` with visible buttons (implemented in _UI3_)
- [x] **SB3**: Add stories showing available `Button` variations

### Server
- [x] **S1**: Implement custom endpoint for marking single todo item as "done". Calling this endpoint sets `done` field to `true` and `finishedAt` field sets to current time. Use this new endpoint on client

### Advanced tasks (optional)
- [x] **O1**: modify the `Form` component (and related ones if needed) so the form field handles not only string, but also number and treat empty string input as `undefiened`
- [x] **O2**: limit amount of server calls needed to necessary minimum

## Additional comments and restrictions:
- do not modify API (props) of provided components unless achieving required tasks would not be possible otherwise,
- do not use any component library like Material UI; do not use Tailwind,
- feel free to do any other visual modifications that - in your opinion - makes it looking nicer,
- feel free to install and use any public package you may need

### GitHub
- do your best to use atomic commits
- in each commit that solves (fully or partly) one of the tasks above, add tasks id into commit message. For example: _B1: fix typo in ..._   

### Storybook
- We use Storybook format CSF3, but you can use older version of CSF that you are familiar with
- If you are not familiar with Storybook at all: try at least the _SB2_ task; it should be doable only by copying and modifying the already existing story


